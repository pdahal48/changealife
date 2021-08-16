const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("createToken for admin", function () {
  test("works: not admin", function () {
    const token = createToken({ username: "test", is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false,
      isCreator: false
    });
  });

  test("works: admin", function () {
    const token = createToken({ username: "test", is_admin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: true,
      isCreator: false
    });
  });

  test("works: default no admin", function () {
    // given the security risk if this didn't work, checking this specifically
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false,
      isCreator: false
    });
  });
});

describe("createToken for creator", function () {
    test("works: not creator", function () {
      const token = createToken({ username: "test", is_creator: false });
      const payload = jwt.verify(token, SECRET_KEY);
      expect(payload).toEqual({
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
        isCreator: false
      });
    });
  
    test("works: admin", function () {
      const token = createToken({ username: "test", is_creator: true });
      const payload = jwt.verify(token, SECRET_KEY);
      expect(payload).toEqual({
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
        isCreator: true
      });
    });
  
    test("works: default no admin", function () {
      // given the security risk if this didn't work, checking this specifically
      const token = createToken({ username: "test" });
      const payload = jwt.verify(token, SECRET_KEY);
      expect(payload).toEqual({
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
        isCreator: false
      });
    });
  });