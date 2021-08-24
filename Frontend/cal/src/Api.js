import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to to the API.
 */

export class CalAPI {
  // the token to interact with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //passing authorization token via request header
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

  /* Users routes
    *
  sign up the user 
  */

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

  //grabs individual user
  static async get(name) {
    console.log(`get route`)
    let res = await this.request(`users/${name}`);
    return res;
  }

  //grabs shelter information regardig the user
  static async getShelters() {
    let res = await this.request(`shelters`);
    return res.shelters;
  }

  //Save user profile page 
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  //WishList routes

  //adds a wish
  static async add(wishObj) {
  let res = await this.request(`wishes`,  wishObj, "post");
  return res;
  }

  //removes a wish
  static async remove(id) {
    let res = await this.request(`wishes/${id}`, id, "delete");
    return res;
  }

  //Success stories Routes

  //gets all stories
  static async getStories(){
    let res = await this.request(`stories`);
    return res.stories;
  }
  //adds a story
  static async addStory(data){
    let res = await this.request(`stories`, data, "post");
    return res;
  }
}

