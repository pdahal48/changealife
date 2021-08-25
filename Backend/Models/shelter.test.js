"use strict";

const {
  NotFoundError,
} = require("../expressError");
const db = require("../db.js");
const Shelter = require("./shelter.js");
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
  const newShelter = {
    name: "TestShelter",
    address: "1111 E. main st",
    city: "Hamilton",
    state: "Ohio",
    zip: 45332,
    phone: "5130000000"
  };
  const newShelter2 = {
    name: "TestShelter2",
    city: "Hamilton",
    state: "Ohio",
    zip: 45332,
    phone: "5130000000"
  };

  test("works", async function () {
    let shelter = await Shelter.add(newShelter);
    expect(shelter).toEqual(newShelter);
    const found = await db.query("SELECT * FROM shelter WHERE name = 'TestShelter'");
    expect(found.rows.length).toEqual(1);
  });

  //23502 is postgres NOT NULL VIOLATION code
  test("Does not work with incomplete data", async function () {
      try {
        let shelter = await Shelter.add(newShelter2);
        fail();
      } catch(err) {
        expect(err.code).toEqual("23502");
      }
  });
});

/* ************************************* findAll */

describe("findAll", function () {
  test("works", async function () {
    const shelters = await Shelter.findAll();
    expect(shelters).toEqual( { "shelters":
        [{
        name: "Shelter-1",
        address: "111 E. Main st",
        city: "Hamilton",
        state: "Ohio",
        zip: 45011,
        phone: "5130001111"
      },
        {
            name: "Shelter-2",
            address: "111 E. Main st",
            city: "Hamilton",
            state: "Ohio",
            zip: 45011,
            phone: "5130003333"
        },
    ]}
    );
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let shelter = await Shelter.get("Shelter-1");
    expect(shelter).toEqual(
        [{
            name: "Shelter-1",
            address: "111 E. Main st",
            city: "Hamilton",
            state: "Ohio",
            zip: 45011,
            phone: "5130001111"
        }]
    );
  });

  test("not found if no such shelter", async function () {
    try {
      await Shelter.get("noshelter");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Shelter.remove("Shelter-1");
    const res = await db.query(
        "SELECT * FROM shelter WHERE name='shelter-1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such shelter", async function () {
    try {
      await Shelter.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
