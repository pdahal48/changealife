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

describe('Get /stories', function () {
    test('works for anon', async function () {
        const resp = await request(app).get('/stories')
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ 
            "stories": [{
                id: expect.any(Number),
                user_username: "newTestUser",
                src: "/images/1",
                story: "test story"
            },
            {
                id: expect.any(Number),
                user_username: "newTestUser2",
                src: "/images/1",
                story: "test story"
            }
        ]})
    })
})

describe('POST /stories', function () {
    test('works for anon', async function () {
        const resp = await request(app).post('/stories').send({
            user_username: "newTestUser3",
            src: "/images/1",
            story: "test story"
        })

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ 
            "stories": {
                user_username: "newTestUser3",
                src: "/images/1",
                story: "test story"
            }
        })
    })
})

describe('DELETE /stories/:name', function () {
    test('does not work for anon', async function () {
        const resp = await request(app).delete('/stories/newTestUser1')
        expect(resp.statusCode).toBe(401);
    })
    test ('works for the creator', async function () {
        const resp = await request(app).delete('/stories/newTestUser').send({_token: creatorToken})
        expect(resp.statusCode).toBe(200);
    })
    test ('works for the user', async function () {
        const resp = await request(app).delete('/stories/newTestUser').send({_token: u1Token})
        expect(resp.statusCode).toBe(200);
    }) 
})