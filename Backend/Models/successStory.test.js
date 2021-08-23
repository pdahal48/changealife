"use strict";

const {
  NotFoundError,
} = require("../expressError");
const db = require("../db.js");
const successStory = require("./successStory.js");
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
  const newStory = {
    user_username: "testUser1",
    src: "/images/1",
    story: "this is a test sucess story",
  };
  const newStory2 = {
    user_username: "testUser3",
    story: "this is a test sucess story",
  };

  test("works", async function () {
    let story = await successStory.add(newStory);
    expect(story).toEqual(newStory);
    const found = await db.query("SELECT * FROM success_stories WHERE user_username = 'testUser1'");
    expect(found.rows.length).toEqual(1);
  });

  //23502 is postgres NOT NULL VIOLATION code
  test("Does not work with incomplete data", async function () {
      try {
        let story = await successStory.add(newStory2);
        fail();
      } catch(err) {
        expect(err.code).toEqual("23502");
      }
  });
});

/* ************************************* findAll */

describe("findAll", function () {
  test("works", async function () {
    const stories = await successStory.findAll();
    expect(stories).toEqual({ "stories":
        [{
            id: expect.any(Number),
            user_username: "testUser2",
            src: "/images/2",
            story: "test story",
        },
    ]}
    );
  });
});

/************************************** get */

describe("get", function () {
    test("works", async function () {
    let story = await successStory.get("testUser2");
    expect(story).toEqual(
    [{
        id: expect.any(Number), 
        src: "/images/2", 
        story: "test story", 
        user_username: "testUser2"
    }]);
})
    test("not found if no such story", async function () {
        try {
            await successStory.get("testUser7");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
})


/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await successStory.remove("testUser2");
    const res = await db.query(
        "SELECT * FROM success_stories WHERE user_username='testUser2'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such story", async function () {
    try {
      await successStory.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
