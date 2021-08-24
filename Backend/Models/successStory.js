"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

/** Related functions for success Story. */

class SuccessStories {

  //Adds a success story given an image's src, story, and an associated username
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

  /** Given an username, return the detail about a success story associated with the user.
   * Throws NotFoundError if user not found.
  **/

  static async get(username) {
    const storyRes = await db.query(
      `SELECT 
          id, 
          user_username,
          src, 
          story
          FROM success_stories
      WHERE user_username LIKE $1`,
      [username],
    );

    if (!storyRes.rows[0]) throw new NotFoundError(`No shelter found: ${username}`);
    return storyRes.rows;
  }

  /** Delete given story from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM success_stories
           WHERE user_username = $1
           RETURNING id`,
        [username],
    );
    const story = result.rows[0];
    if (!story) throw new NotFoundError(`No story associated with : ${username}`);
  }
}

module.exports = SuccessStories;