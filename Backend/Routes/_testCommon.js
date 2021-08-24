"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Shelter = require("../Models/shelter.js");
const { createToken } = require("../helpers/tokens");
const successStories = require("../Models/successStory.js");
const wishList = require("../Models/wishList")

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM shelter");
  await db.query("DELETE FROM images");
  await db.query("DELETE FROM success_stories");
  await db.query("DELETE FROM wishList");


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
    fullName: "Test User",
    age: "10",
    city: "Hamilton",
    state: "Ohio",
    phone: "5131110000",
    email: "test0@gmail.com",
    shelter: "Shelter-1",
    image: "/images/0",
    bio: "test biography",
    highlight: "Test User",
    is_admin: false,
    is_creator: false
  });

  await User.register({
    username: "newTestUser1",
    password: "password1",
    fullName: "TestUser",
    age: "10",
    city: "Hamilton",
    state: "Ohio",
    phone: "5131111111",
    email: "test0@gmail.com",
    shelter: "Shelter-1",
    image: "/images/1",
    bio: "test biography",
    highlight: "Test User",
    is_admin: false,
    is_creator: false
  });

  await User.register({
    username: "newTestUser2",
    password: "password1",
    fullName: "TestUser",
    age: "10",
    city: "Hamilton",
    state: "Ohio",
    phone: "5131112222",
    email: "test0@gmail.com",
    shelter: "Shelter-2",
    image: "/images/2",
    bio: "test biography",
    highlight: "Test User",
    is_admin: false,
    is_creator: false
  });
  
  await User.register({
    username: "newTestUser3",
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
  });

  //Adding success stories
  await successStories.add({
    user_username: "newTestUser",
    src: "/images/1",
    story: "test story"
  })

  await successStories.add({
    user_username: "newTestUser2",
    src: "/images/1",
    story: "test story"
  })

  //Adding user's wishses
  await wishList.add({
    user_username: "newTestUser2",
    wish: "test wish",
  })

  await wishList.add({
    user_username: "newTestUser",
    wish: "test wish",

  })
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
