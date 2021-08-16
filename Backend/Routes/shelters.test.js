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

//Tests getting list of all users; should only work for creator
describe('Get /shelters', function () {
    test('works for anon', async function () {
        const resp = await request(app).get('/shelters')
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ 
            "shelters": [{
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
            }
        ]})
    })
})

//tests grabbing shelter information
describe('/shelters/:name', function () {
    const shelter = {
        "shelter": [{
            name: "Shelter-1",
            address: "111 E. Main st",
            city: "Hamilton",
            state: "Ohio",
            zip: 45011,
            phone: "5130001111"
        }]
    }
    test('pulls the specific shelter information without any token', async function () {
        const resp = await request(app)
            .get('/shelters/Shelter-1')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(shelter)
    })
})

//tests removing user from the database
describe('delete: /shelters/:name', function () {
    test('allows only the creator to delete a shelter', async function () {
        const resp = await request(app)
            .delete('/shelters/Shelter-1')
            .send({ _token: creatorToken });
        expect(resp.statusCode).toBe(200)
    })

    test('does not allow admin to delete shelter information', async function () {
        const resp = await request(app)
            .delete('/shelters/Shelters-1').
            send({ _token: adminToken });
        expect(resp.statusCode).toBe(401)
    })
    test('des not allow an user to delete shelter information', async function () {
        const resp = await request(app)
            .delete('/shelters/Shelters-1').
            send({ _token: u1Token });
        expect(resp.statusCode).toBe(401)
    })
})