"use strict";

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
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//Tests getting list of all users; should only work for creator
describe('Get /users', function () {
    test('works for creator only', async function () {
        const resp = await request(app).get('/users').send({_token: creatorToken})
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(
            [{
                username: "newTestUser",
                name: "TestUser",
                city: "Hamilton",
                state: "Ohio",
                age: 35,
                image: "/images/1",
                highlight: "Test User",
                is_admin: false,
                is_creator: false
            },
            {
                username: "newTestUser1",
                name: "TestUser",
                city: "Hamilton",
                state: "Ohio",
                age: 35,
                image: "/images/1",
                highlight: "Test User",
                is_admin: false,
                is_creator: false
            },
            {
                username: "newTestUser2",
                name: "TestUser",
                city: "Hamilton",
                state: "Ohio",
                age: 35,
                image: "/images/1",
                highlight: "Test User",
                is_admin: true,
                is_creator: false           
            },
            {
                username: "newTestUser3",
                name: "TestUser",
                city: "Hamilton",
                state: "Ohio",
                age: 35,
                image: "/images/1",
                highlight: "Test User",
                is_admin: false,
                is_creator: true
        }])

    })

    test('Does not work for admin only', async function () {
        const resp = await request(app).get('/users').send({_token: adminToken})
        expect(resp.statusCode).toBe(401);
    })
    test('Does not work for users', async function () {
        const resp = await request(app).get('/users').send({_token: u1Token})
        expect(resp.statusCode).toBe(401);
    })
})

//tests register feature
describe('/users/register', function () {
    test('allows to register', async function () {
        const newUser = {
            username: "newTestUser5",
            name: "TestUser",
            city: "Hamilton",
            state: "Ohio",
            age: 35,
            image: "/images/1",
            highlight: "Test User",
            is_admin: false,
            is_creator: false
        }
        const resp = await request(app).post('/users/register').send({...newUser, password: "password1"})
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({
            "user": {
                ...newUser
            },
            token: expect.any(String)
        })
    })
})

//tests login feature
describe('/users', function () {
    test('allows users to login', async function () {
        const resp = await request(app)
            .post('/users').
            send({username: "newTestUser1", password: "password1"})
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
                user: {
                  username: 'newTestUser1',
                  name: 'TestUser',
                  city: 'Hamilton',
                  state: 'Ohio',
                  age: 35,
                  image: '/images/1',
                  highlight: 'Test User',
                  is_admin: false,
                  is_creator: false
                }
            })
    })
})

//tests grabbing users information
describe('/users/:username', function () {
    const user = {
        user: {
            username: 'newTestUser1',
            name: 'TestUser',
            city: 'Hamilton',
            state: 'Ohio',
            age: 35,
            image: '/images/1',
            highlight: 'Test User',
            is_admin: false,
            is_creator: false,
            wish: []
          }
    }
    test('allows logged in user to pull their information', async function () {
        const resp = await request(app)
            .get('/users/newTestUser1').
            send({ _token: u2Token })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(user)
    })

    test('allows creator to pull their information', async function () {
        const resp = await request(app)
            .get('/users/newTestUser1').
            send({ _token: creatorToken })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(user)
    })

    test('does not allow admin to pull users information', async function () {
        const resp = await request(app)
            .get('/users/newTestUser1').
            send({ _token: adminToken })
        expect(resp.statusCode).toBe(401)
    })
    test('des not allow different user to pull another users info', async function () {
        const resp = await request(app)
            .get('/users/newTestUser1').
            send({ _token: u1Token })
        expect(resp.statusCode).toBe(401)
    })
})

//tests removing user from the database
describe('/users/:username', function () {
    test('allows user to delete their information', async function () {
        const resp = await request(app)
            .delete('/users/newTestUser1').
            send({ _token: u2Token })
        expect(resp.statusCode).toBe(200)
    })

    test('allows creator to delete user information', async function () {
        const resp = await request(app)
            .delete('/users/newTestUser1').
            send({ _token: creatorToken })
        expect(resp.statusCode).toBe(200)
    })

    test('does not allow admin to delete users information', async function () {
        const resp = await request(app)
            .delete('/users/newTestUser1').
            send({ _token: adminToken })
        expect(resp.statusCode).toBe(401)
    })
    test('des not allow different user to delete another users info', async function () {
        const resp = await request(app)
            .delete('/users/newTestUser1').
            send({ _token: u1Token })
        expect(resp.statusCode).toBe(401)
    })
})