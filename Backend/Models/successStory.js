"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

/** Related functions for shelter. */

class SuccessStories {
  static async add(
      { user_username, src, story }) {
    const duplicateCheck = await db.query(
          `SELECT user_username
           FROM success_stories
           WHERE user_username = $1`,
        [user_username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Success story already exists for : ${user_username}`);
    }

    const result = await db.query(
          `INSERT INTO success_stories
            ( user_username, src, story )
           VALUES ($1, $2, $3)
           RETURNING user_username, src, story`,
        [
            user_username, 
            src, 
            story, 
        ],
    );
    return result.rows[0];
  }

  /** Find all stories.
   *
   * Returns [{ user_username, src, story}, ...]
   **/

  static async findAll() {
    const result = await db.query(
          `SELECT 
                id, 
                user_username, 
                src, 
                story
           FROM success_stories
           ORDER BY id`,
    );
    const stories = result.rows;
    return { stories };
  }

  /** Given a shelter name, return data about the shelter.
   *
   * Returns { name, address, city, state, zip, phone }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(id) {
    const storyRes = await db.query(
      `SELECT 
          id, 
          user_username,
          src, 
          story
          FROM success_stories
      WHERE id LIKE $1`,
      [id],
    );

    if (!storyRes.rows[0]) throw new NotFoundError(`No shelter found: ${name}`);
    return storyRes.rows;
  }

  /** Delete given shelter from database; returns undefined. */

  static async remove(id) {
    let result = await db.query(
          `DELETE
           FROM success_stories
           WHERE id = $1
           RETURNING id`,
        [id],
    );
    const story = result.rows[0];
    if (!story) throw new NotFoundError(`No story with the id of : ${id}`);
  }
}

module.exports = SuccessStories;