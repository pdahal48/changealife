"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for wishList. */

class wishList {
  static async add(
      { user_username, wish }) {

    const result = await db.query(
          `INSERT INTO wishlist
            (user_username, wish)
           VALUES ($1, $2)
           RETURNING user_username, wish`,
        [
            user_username,
            wish
        ],
    );
    return result.rows[0];
  }

  // Find all wishes.

  static async findAll() {
    const result = await db.query(
          `SELECT 
              id, user_username, wish
           FROM wishlist
           `,
    );
    const wish = result.rows;
    return { wish };
  }

  static async remove({id}) {
    let result = await db.query(
          `DELETE
           FROM wishlist
           WHERE id = $1
           RETURNING id`,
        [id],
    );
    const wish = result.rows[0];
    if (!wish) throw new NotFoundError(`No such wish: ${id}`);
  }
}

module.exports = wishList;