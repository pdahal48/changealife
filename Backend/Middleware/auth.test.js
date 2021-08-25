process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
    creatorToken
  } = require("../Routes/_testCommon");
  
  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);


describe("Get /:username", function () {
    test('returns the user for the user', async function () {
        const response = await request(app).get('/users/newTestUser').send({_token: u1Token})
        expect(response.statusCode).toBe(200)
    })
    test('returns the user for the creator', async function () {
        const response = await request(app).get('/users/newTestUser').send({_token: creatorToken})
        expect(response.statusCode).toBe(200)
    })
});

describe("delete /:username", function () {
    test('user is able to delete himself', async function () {
        const response = await request(app).delete('/users/newTestUser').send({_token: u1Token})
        expect(response.statusCode).toBe(200)
    })
    test('creator is able to delete the user', async function () {
        const response = await request(app).delete('/users/newTestUser').send({_token: creatorToken})
        expect(response.statusCode).toBe(200)
    })
    test('admin is not able to delete the user', async function () {
        const response = await request(app).delete('/users/newTestUser').send({_token: adminToken})
        expect(response.statusCode).toBe(401)
    })
    test('user is not able to delete another user', async function () {
        const response = await request(app).delete('/users/newTestUser').send({_token: u2Token})
        expect(response.statusCode).toBe(401)
    })
});