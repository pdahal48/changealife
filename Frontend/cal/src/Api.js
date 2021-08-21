import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export class CalAPI {
  // the token to interact with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CalAPI.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

//Users

   /** sign up the user */

static async signup(userObj) {
  try {
    let res = await this.request(`auth/register`, userObj, "post");
    return res;
  } catch(e) {
      return {error: e};
  }
}

  /** Logs in the user */
  static async login(data) {
  let res = await this.request(`users/login`, data, "post");
  return res.token;
}

    /** PUlls user info */

  static async getPeople(name) {
    let res = await this.request("users", { name });
    return res.users;
  }

  static async get(name) {
    console.log(`get route`)
    let res = await this.request(`users/${name}`);
    return res;
  }

  static async getShelters() {
    let res = await this.request(`shelters`);
    return res.shelters;
  }

//     /** Save user profile page. */

  static async saveProfile(username, data) {
    console.log(`Api got the request`)
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  //WishList routes
  static async add(wishObj) {
  console.log(`get route`)
  let res = await this.request(`wishes`,  wishObj, "post");
  return res;
}

static async remove(id) {
  console.log(`get route`)
  let res = await this.request(`wishes/${id}`, id, "delete");
  return res;
}

}

