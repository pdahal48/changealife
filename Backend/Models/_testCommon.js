const bcrypt = require("bcrypt");
const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  let hashedpass1 = await bcrypt.hash("password1", BCRYPT_WORK_FACTOR)
  let hashedpass2 = await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)

  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM shelter");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM images");
  await db.query("DELETE FROM shelter_users");


  //Inserting into shelter table
  await db.query(`
    INSERT INTO shelter
      (name, address, city, state, zip, phone)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING name`,
      ['Shelter-1', '111 E. Main st', 'Hamilton', 'Ohio', 45011, 5130001111]
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
      (username, password, fullName, city, state, age, phone, email, shelter, bio, highlight, is_admin, is_creator)
    VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)

    RETURNING username`,
    [
      'testUser1',
      hashedpass1,
      'Test User',
      'Hamilton',
      'Ohio',
      "35",
      "5130000000",
      "test0@gmail.com",
      "Shelter-1",
      "this is test bio",
      'test highlight',
      false,
      false
    ]);

    await db.query(`
    INSERT INTO users
        (username, password, fullName, city, state, age, phone, email, shelter, bio, highlight, is_admin, is_creator)
    VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)

    RETURNING username`,
    [
      'testUser2',
      hashedpass2,
      'Test User',
      'Hamilton',
      'Ohio',
      "35",
      "5130001111",
      "test0@gmail.com",
      "Shelter-2",
      "this is test bio",
      'test highlight',
      false,
      false
    ]
    );

    //adding a success story
    await db.query(`
      INSERT INTO success_stories
    (user_username, src, story)
    VALUES
      ($1, $2, $3)
    RETURNING user_username`,
    [ 'testUser2', '/images/2', 'test story']
    );

    //inserting images for users
    await db.query(`
    INSERT INTO images
      (user_username, src)
    VALUES
      ($1, $2)
    RETURNING user_username`,
    ['testUser1', '/images/2']
  );

  await db.query(`
  INSERT INTO images
    (user_username, src)
  VALUES
    ($1, $2)
  RETURNING user_username`,
    ['testUser2', '/images/2']
  );

  //Associating users with their appropriate shelter

  await db.query(`
    INSERT INTO shelter_users
      (user_username, shelter_name)
    VALUES
      ($1, $2)
    RETURNING user_username, shelter_name`,
      ['testUser1', 'Shelter-1']
  );

  await db.query(`
  INSERT INTO shelter_users
    (user_username, shelter_name)
  VALUES
    ($1, $2)
  RETURNING user_username, shelter_name`,
    ['testUser2', 'Shelter-2']
);

  await db.query(`
  INSERT INTO wishList
    (user_username, wish)
  VALUES
    ($1, $2)
  RETURNING user_username, wish`,
    ['testUser1', 'test wish']
  );
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