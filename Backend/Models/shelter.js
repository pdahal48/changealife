"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

/** Related functions for shelter. */

class Shelter {

  /* Adding a shelter given a name, address, city, state, zip and phone */
  static async add(
      { name, address, city, state, zip, phone }) {
    const duplicateCheck = await db.query(
          `SELECT name
           FROM shelter
           WHERE name = $1`,
        [name],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate shelter: ${name}`);
    }

    const result = await db.query(
          `INSERT INTO shelter
            ( name, address, city, state, zip, phone )
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING name, address, city, state, zip, phone`,
        [
            name, 
            address, 
            city, 
            state, 
            zip, 
            phone
        ],
    );
    return result.rows[0];
  }

  /** Find all shelters.
   * Returns [{ name, address, city, state, zip, phone }, ...]
  **/
  static async findAll() {
    const result = await db.query(
          `SELECT 
                name, 
                address, 
                city, 
                state, 
                zip, 
                phone
           FROM shelter
           ORDER BY name`,
    );
    const shelters = result.rows;
    return { shelters };
  }

  /** Given a shelter name, return data about the shelter.
   * Returns { name, address, city, state, zip, phone }
   * Throws NotFoundError if user not found.
  **/
  static async get(name) {
    const shelterRes = await db.query(
      `SELECT 
          name, 
          address, 
          city, 
          state, 
          zip, 
          phone
          FROM shelter
      WHERE name LIKE $1`,
      [name],
    );

    if (!shelterRes.rows[0]) throw new NotFoundError(`No shelter found: ${name}`);
    return shelterRes.rows;
  }

  /** Delete given shelter from database; returns undefined. */
  static async remove(name) {
    let result = await db.query(
          `DELETE
           FROM shelter
           WHERE name = $1
           RETURNING name`,
        [name],
    );
    const shelter = result.rows[0];
    if (!shelter) throw new NotFoundError(`No such shelter: ${name}`);
  }
}

module.exports = Shelter;