const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");


async function commonBeforeAll() {

    let hashedpass1 = await bcrypt.hash("password1", BCRYPT_WORK_FACTOR)
    let hashedpass2 = await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)

  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM shelter");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  //Inserting into shelter table
  await db.query(`
    INSERT INTO shelter
        (name, address, city, state, zip, phone)
    VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING name`,
        [ 'Shelter-1', '111 E. Main st', 'Hamilton', 'Ohio', 45011, 5130001111]
);
    await db.query(`
    INSERT INTO shelter
        (name, address, city, state, zip, phone)
    VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING name`,
            ['Shelter-2', '111 E. Main st', 'Hamilton', 'Ohio', 45011, 5130003333]
    );

  //Inserting into users table

  await db.query(`
  INSERT INTO users
        (username, password, name, city, state, age, image, highlight, is_admin, is_creator)
    VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

    RETURNING username`,
      [
        'testUser1',
        hashedpass1,
        'User',
        'Hamilton',
        'Ohio',
        35,
        '/images/1',
        'test highlight',
        false,
        false
      ]);

    await db.query(`
    INSERT INTO users
        (username, password, name, city, state, age, image, highlight, is_admin, is_creator)
    VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

    RETURNING username`,
      [
        'testUser2',
        hashedpass2,
        'User',
        'Hamilton',
        'Ohio',
        35,
        '/images/2',
        'test highlight',
        false,
        false
      ]);

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


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};