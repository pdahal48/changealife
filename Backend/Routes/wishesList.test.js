"use strict";

const request = require("supertest");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
  creatorToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//Tests getting list of all wishes
describe('Get /wishes', function () {
    test('works for anon', async function () {
        const resp = await request(app).get('/wishes')
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ 
            "wish": [{
                id: expect.any(Number),
                user_username: "newTestUser2",
                wish: "test wish",
            },
            {
                id: expect.any(Number),
                user_username: "newTestUser",
                wish: "test wish",
            }
        ]})
    })
})

//Tests posting a wish
describe('POST /wishes', function () {
    test('works for anon', async function () {
        const resp = await request(app).post('/wishes').send({
            user_username: "newTestUser3",
            wish: "another test wish"
        })
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ 
            "wish": {
                user_username: "newTestUser3",
                wish: "another test wish",
            }
        })
    })
})

//tests removing user from the database
describe('delete: /wishes/:name', function () {
    test('does not allow admin to delete users wish', async function () {
        const resp = await request(app)
            .delete('/wishes/40').
            send({ _token: adminToken });
        expect(resp.statusCode).toBe(401)
    })
    test('does not allow an user to delete another users wish', async function () {
        const resp = await request(app)
            .delete('/wishes/40').
            send({ _token: u1Token });
        expect(resp.statusCode).toBe(401)
    })
})