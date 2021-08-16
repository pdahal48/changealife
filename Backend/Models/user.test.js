"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("testUser1", "password1");
    expect(user).toEqual({
      username: "testUser1",
      name: "User",
      city: "Hamilton",
      state: "Ohio",
      age: 35,
      image: "/images/1",
      highlight: "test highlight",
      is_admin: false,
      is_creator: false
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauth if wrong password", async function () {
    try {
      const test = await User.authenticate("testUser1", "wrongPassword");
      console.log(test)
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "newTestUser",
    name: "TestUser",
    city: "Hamilton",
    state: "Ohio",
    age: 35,
    image: "/images/1",
    highlight: "Test User",
    is_creator: false
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "testUserPassword1"
    });
    expect(user).toEqual({ ...newUser, is_admin: false });
    const found = await db.query("SELECT * FROM users WHERE username = 'newTestUser'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(false);
    expect(found.rows[0].is_creator).toEqual(false);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("works: adds admin", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
      is_admin: true,
    });
    expect(user).toEqual({ ...newUser, is_admin: true });
    const found = await db.query("SELECT * FROM users WHERE username = 'newTestUser'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(true);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "testUser1",
        name: "User",
        city: "Hamilton",
        state: "Ohio",
        age: 35,
        image: "/images/1",
        highlight: "test highlight",
        is_admin: false,
        is_creator: false
      },
      {
        username: "testUser2",
        name: "User",
        city: "Hamilton",
        state: "Ohio",
        age: 35,
        image: "/images/2",
        highlight: "test highlight",
        is_admin: false,
        is_creator: false
      },
    ]);
  });
});

// /************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.get("testUser1");
    expect(user).toEqual({
        username: "testUser1",
        name: "User",
        city: "Hamilton",
        state: "Ohio",
        age: 35,
        image: "/images/1",
        highlight: "test highlight",
        is_admin: false,
        is_creator: false,
        wish: []
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


// /************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await User.remove("testUser1");
    const res = await db.query(
        "SELECT * FROM users WHERE username='testUser1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
