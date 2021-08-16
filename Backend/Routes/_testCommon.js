"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Shelter = require("../Models/shelter.js");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM shelter");

  await Shelter.add(
    {
      name: "Shelter-1",
      address: "111 E. Main st",
      city: "Hamilton",
      state: "Ohio",
      zip: 45011,
      phone: "5130001111"
    });
  await Shelter.add(
    {
      name: "Shelter-2",
      address: "111 E. Main st",
      city: "Hamilton",
      state: "Ohio",
      zip: 45011,
      phone: "5130003333"
  });

  await User.register({
    username: "newTestUser",
    password: "password1",
    name: "TestUser",
    city: "Hamilton",
    state: "Ohio",
    age: 35,
    image: "/images/1",
    highlight: "Test User",
    is_admin: false,
    is_creator: false
  });
  await User.register({
    username: "newTestUser1",
    password: "password1",
    name: "TestUser",
    city: "Hamilton",
    state: "Ohio",
    age: 35,
    image: "/images/1",
    highlight: "Test User",
    is_admin: false,
    is_creator: false
  });
  await User.register({
    username: "newTestUser2",
    password: "password1",
    name: "TestUser",
    city: "Hamilton",
    state: "Ohio",
    age: 35,
    image: "/images/1",
    highlight: "Test User",
    is_admin: true,
    is_creator: false
  });
  await User.register({
    username: "newTestUser3",
    password: "password1",
    name: "TestUser",
    city: "Hamilton",
    state: "Ohio",
    age: 35,
    image: "/images/1",
    highlight: "Test User",
    is_admin: false,
    is_creator: true
});
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "newTestUser", is_admin: false, is_creator: false });
const u2Token = createToken({ username: "newTestUser1", is_admin: false, is_creator: false });
const adminToken = createToken({ username: "newTestUser2", is_admin: true, is_creator: false });
const creatorToken = createToken({ username: "newTestUser3", is_admin: false, is_creator: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
  creatorToken
};
