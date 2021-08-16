\c cal

DROP TABLE users CASCADE;
DROP TABLE shelter CASCADE;
DROP TABLE wishlist;
DROP TABLE shelter_users CASCADE;
DROP TABLE images CASCADE;

CREATE TABLE users
(
  username TEXT PRIMARY KEY CHECK (length(username) <= 25),
  password TEXT NOT NULL,
  fullName TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  age TEXT NOT NULL,
  highlight TEXT NOT NULL,
  bio TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  shelter TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_creator BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
  user_username TEXT UNIQUE,
  src TEXT NOT NULL
);

CREATE TABLE shelter (
  name TEXT PRIMARY KEY,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip INTEGER NOT NULL,
  phone BIGINT UNIQUE NOT NULL
);

CREATE TABLE wishlist (
  id SERIAL PRIMARY KEY,
  user_username TEXT
    REFERENCES users ON DELETE CASCADE,
  wish TEXT NOT NULL
);

CREATE TABLE shelter_users
(
  id SERIAL PRIMARY KEY,
  user_username TEXT REFERENCES users ON DELETE CASCADE,
  shelter_name TEXT REFERENCES shelter ON DELETE CASCADE
);