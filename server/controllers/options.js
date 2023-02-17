import { mongoose } from "mongoose"
import { reqAuth, MONGO_DB_URI } from "./helper"
import { wp_options } from "../models/wp_options"

/**
 * req: {token: "token", body: {}}
 * res: {success: true, msg: "success"} / { success: false, msg: "User is not logged on" }
 */


export class OptionsController {
  constructor() {
    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
    mongoose.connect(MONGO_DB_URI);
  }

  // get all options from the database
  async getOptions(req) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return authObject;
    }

    return await wp_options.find();
  }





}