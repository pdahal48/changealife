"use strict";
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config.js");
const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   * Throws UnauthorizedError is user not found or wrong password.
  **/

  static async authenticate(username, password) {

    // tries to find the user first
    const result = await db.query(
          `SELECT username, 
              password, 
              fullName, 
              city, 
              state, 
              age, 
              phone,
              email,
              shelter,
              bio,
              highlight,
              is_admin, 
              is_creator
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if  (isValid === true) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with applicable data.
   * Throws BadRequestError on duplicates.
  **/

  static async register(
      { username, password, fullName, city, state, age, highlight, bio, phone, email, shelter, image, is_admin=false, is_creator=false }) {
              
      const duplicateCheck = await db.query(
        `SELECT username
          FROM users
          WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.query(
          `INSERT INTO users
            ( 
              username, 
              fullName,
              age,  
              city, 
              state, 
              phone,
              email,
              shelter,
              bio,
              highlight,
              password, 
              is_admin, 
              is_creator
            )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           RETURNING *`,
        [
          username, 
          fullName, 
          age, 
          city, 
          state, 
          phone,
          email,
          shelter,
          bio,
          highlight,
          hashedPassword, 
          is_admin, 
          is_creator
        ],
    );


    const imageResult = await db.query(
      `INSERT INTO images
        (user_username, src)
      VALUES ($1, $2)
      RETURNING *`,
      [
        username,
        image
      ]
    );

    const shelterResult = await db.query(
      `INSERT INTO shelter_users
        (user_username, shelter_name)
      VALUES ($1, $2)
      RETURNING *`,
      [
        username,
        shelter
      ]
    );
    
    const user = result.rows[0];
    user.image = imageResult.rows[0].src
    user.shelter = shelterResult.rows[0]

    return user;
  }

  //Find all users.

  static async findAll(searchFilters = {}) {

    let query = `SELECT users.username, 
                  users.password, 
                  users.fullName, 
                  users.city, 
                  users.state, 
                  users.age, 
                  users.phone,
                  users.email,
                  users.shelter,
                  users.bio,
                  users.highlight,
                  users.is_admin, 
                  users.is_creator,
                  images.src
                FROM users
                INNER JOIN 
                images
                 on users.username=images.user_username
                `;

    let whereExpressions = [];
    let queryValues = [];

    const { name } = searchFilters;

    if (name) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`fullName ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results
    query += " ORDER BY fullName";

    const usersRes = await db.query(query, queryValues);
    return usersRes.rows;
  }

  /** Given a username, return data about the user
   * Throws NotFoundError if user not found.
  **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT 
        username, 
        password, 
        fullName, 
        city, 
        state, 
        age, 
        phone,
        email,
        shelter,
        bio,
        highlight,
        is_admin, 
        is_creator
      FROM users
        WHERE username = $1`,
      [username],
    );

    const wishList = await db.query(
      `SELECT id, wish
      FROM wishlist
      WHERE user_username = $1
      `, [username]
    )
    
    const shelter = await db.query(
      `SELECT
          s.name,
          s.address,
          s.city,
          s.state,
          s.phone,
          s.zip
        FROM shelter AS s
          JOIN shelter_users
        ON s.name=shelter_users.shelter_name
        WHERE shelter_users.user_username=$1
      `, [username]
    )

    const image = await db.query(
      `SELECT user_username, src
      FROM images
      WHERE user_username=$1
      `, [username]
    )

    const user = userRes.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);

    user.wish= wishList.rows.map(w => w)
    user.shelter = shelter.rows[0]
    user.image = image.rows[0].src
    return user;
  }

  static async update(username, data) {
    console.log(`in user update`)
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          fullName: "fullname",
          age: "age",
          city: "city",
          state:"state",
          phone: "phone",
          email: "email",
          shelter: "shelter",
          bio: "bio",
          highlight: "highlight",
        });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username
                                `;

    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}


module.exports = User;