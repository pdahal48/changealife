
// If we're running in test "mode", use our test db
// Make sure to create both databases!
const DB_URI =  (process.env.NODE_ENV === "test") 
    ? "postgresql:///cal_test"
    : "postgresql:///cal";

const SECRET_KEY = process.env.SECRET_KEY || "$hamilton2021"
const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    PORT
}