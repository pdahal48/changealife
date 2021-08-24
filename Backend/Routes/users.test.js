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
        const resp = await request(app).get('/users')
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ 
            "users": [{
                username: "newTestUser",
                password: expect.any(String),
                fullname: "Test User",
                age: "10",
                city: "Hamilton",
                state: "Ohio",
                phone: "5131110000",
                email: "test0@gmail.com",
                shelter: "Shelter-1",
                src: "/images/0",
                bio: "test biography",
                highlight: "Test User",
                is_admin: false,
                is_creator: false
            },
            {
                username: "newTestUser1",
                password: expect.any(String),
                fullname: "TestUser",
                age: "10",
                city: "Hamilton",
                state: "Ohio",
                phone: "5131111111",
                email: "test0@gmail.com",
                shelter: "Shelter-1",
                src: "/images/1",
                bio: "test biography",
                highlight: "Test User",
                is_admin: false,
                is_creator: false
            },
            {
                username: "newTestUser2",
                password: expect.any(String),
                fullname: "TestUser",
                age: "10",
                city: "Hamilton",
                state: "Ohio",
                phone: "5131112222",
                email: "test0@gmail.com",
                shelter: "Shelter-2",
                src: "/images/2",
                bio: "test biography",
                highlight: "Test User",
                is_admin: false,
                is_creator: false         
            },
            {
                username: "newTestUser3",
                password: expect.any(String),
                fullname: "TestUser",
                age: "10",
                city: "Hamilton",
                state: "Ohio",
                phone: "5131113333",
                email: "test0@gmail.com",
                shelter: "Shelter-1",
                src: "/images/3",
                bio: "test biography",
                highlight: "Test User",
                is_admin: false,
                is_creator: false
            }]
        })
    })
});

//tests register feature
describe('/users/register', function () {
    test('allows to register', async function () {
        const newUser = {
            username: "newTestUser5",
            password: "password1",
            fullName: "TestUser",
            age: "10",
            city: "Hamilton",
            state: "Ohio",
            phone: "5131113333",
            email: "test0@gmail.com",
            shelter: "Shelter-1",
            image: "/images/3",
            bio: "test biography",
            highlight: "Test User",
            is_admin: false,
            is_creator: false
        }

        const resp = await request(app).post('/users/register').send({...newUser, password: "password1"})
        expect(resp.statusCode).toBe(201)
    })
})

//tests login feature
describe('/users', function () {
    test('allows users to login', async function () {
        const resp = await request(app).post('/users/login').send({username: "newTestUser1", password: "password1"})
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
                user: {
                    username: "newTestUser1",
                    fullname: "TestUser",
                    age: "10",
                    city: "Hamilton",
                    state: "Ohio",
                    phone: "5131111111",
                    email: "test0@gmail.com",
                    shelter: "Shelter-1",
                    bio: "test biography",
                    highlight: "Test User",
                    is_admin: false,
                    is_creator: false
                },
                token: expect.any(String)
            })
    })
})

//tests grabbing users information
describe('/users/:username', function () {
    const user = {
            username: "newTestUser1",
            password: expect.any(String),
            fullname: "TestUser",
            age: "10",
            city: "Hamilton",
            state: "Ohio",
            phone: "5131111111",
            email: "test0@gmail.com",
            shelter: {
                name: "Shelter-1",
                address: "111 E. Main st",
                city: "Hamilton",
                state: "Ohio",
                zip: 45011,
                phone: "5130001111"

            },
            image: "/images/1",
            bio: "test biography",
            highlight: "Test User",
            is_admin: false,
            is_creator: false,
            wish: []
    }
    test('allows logged in user to pull their information', async function () {
        const resp = await request(app).get('/users/newTestUser1');

        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual(user)
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