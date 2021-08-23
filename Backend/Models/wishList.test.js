"use strict";

const {
  NotFoundError,
} = require("../expressError");
const db = require("../db.js");
const wishList = require("./wishList.js");
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

/************************************** Add */

describe("add", function () {
  const newWish = {
    id: 45,
    user_username: "testUser2",
    wish: "test wish2"
  };
  const newWish2 = {
    user_username: "testUser2"
  };

  test("works", async function () {
    let wish = await wishList.add(newWish);
    expect(wish).toEqual({
        user_username: "testUser2",
        wish: "test wish2"
    });
    const found = await db.query("SELECT * FROM wishList WHERE user_username = 'testUser2'");
    expect(found.rows.length).toEqual(1);
  });

  //23502 is postgres NOT NULL VIOLATION code
  test("Does not work with incomplete data", async function () {
      try {
        let wish = await wishList.add(newWish2);
        fail();
      } catch(err) {
        console.log(err.code)
        expect(err.code).toEqual("23502");
      }
  });
});

/* ************************************* findAll */

describe("findAll", function () {
  test("works", async function () {
    const wishes = await wishList.findAll();
    expect(wishes).toEqual( { "wish":
        [{
            id: expect.any(Number),
            user_username: "testUser1",
            wish: "test wish"
        }]
    });
  });
});


/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await db.query(`delete from wishList`)
    const res = await db.query(
        "SELECT * FROM wishList WHERE wish='test wish'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such shelter", async function () {
    try {
      await wishList.remove(100);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
