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
      fullname: "Test User",
      city: "Hamilton",
      state: "Ohio",
      age: "35",
      email: "test0@gmail.com",
      shelter: "Shelter-1",
      phone: "5130000000",
      bio: "this is test bio",
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
      await User.authenticate("testUser1", "wrongPassword");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "testUser",
    fullName: "Test User",
    city: "Hamilton",
    state: "Ohio",
    age: "35",
    email: "test0@gmail.com",
    shelter: "Shelter-1",
    phone: "5130001111",
    bio: "this is test bio",
    highlight: "test highlight",
    image: "/images/3",
    is_admin: false,
    is_creator: false
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "testUserPassword1"
    });

    expect(user).toEqual({
      username: "testUser",
      fullname: "Test User",
      city: "Hamilton",
      state: "Ohio",
      age: "35",
      email: "test0@gmail.com",
      shelter: {
        id: expect.any(Number),
        shelter_name: "Shelter-1",
        user_username: "testUser"
      },
      phone: "5130001111",
      bio: "this is test bio",
      highlight: "test highlight",
      image: "/images/3",
      is_admin: false,
      is_creator: false, 
      password: expect.any(String)
    });

    const found = await db.query("SELECT * FROM users WHERE username = 'testUser'");
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

    expect(user).toEqual({
      username: "testUser",
      fullname: "Test User",
      city: "Hamilton",
      state: "Ohio",
      age: "35",
      email: "test0@gmail.com",
      shelter: {
        id: expect.any(Number),
        shelter_name: "Shelter-1",
        user_username: "testUser"
      },
      phone: "5130001111",
      bio: "this is test bio",
      highlight: "test highlight",
      image: "/images/3",
      is_admin: true,
      is_creator: false, 
      password: expect.any(String)
    });

    const found = await db.query("SELECT * FROM users WHERE username = 'testUser'");
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

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "testUser1",
        fullname: "Test User",
        city: "Hamilton",
        state: "Ohio",
        age: "35",
        email: "test0@gmail.com",
        shelter: "Shelter-1",
        phone: "5130000000",
        bio: "this is test bio",
        highlight: "test highlight",
        src: "/images/2",
        is_admin: false,
        is_creator: false,
        password: expect.any(String)

      },
      {
        username: "testUser2",
        fullname: "Test User",
        city: "Hamilton",
        state: "Ohio",
        age: "35",
        email: "test0@gmail.com",
        shelter: "Shelter-2",
        phone: "5130001111",
        bio: "this is test bio",
        highlight: "test highlight",
        src: "/images/2",
        is_admin: false,
        is_creator: false,
        password: expect.any(String)
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let user = await User.get("testUser1");
    expect(user).toEqual({
        username: "testUser1",
        fullname: "Test User",
        city: "Hamilton",
        state: "Ohio",
        age: "35",
        email: "test0@gmail.com",
        shelter: {
          address: '111 E. Main st',
          name: "Shelter-1",
          city: "Hamilton",
          state: 'Ohio',
          phone: "5130001111",
          zip: 45011
        },
        phone: "5130000000",
        bio: "this is test bio",
        highlight: "test highlight",
        image: "/images/2",
        password: expect.any(String),
        is_admin: false,
        is_creator: false,
        wish: [{
          id: expect.any(Number),
          wish: "test wish"
        }]
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


/************************************** remove */

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
