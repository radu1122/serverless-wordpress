import { mongoose } from "mongoose"
import { reqAuth, MONGO_DB_URI } from "./../config/helper"
import { wp_options, reqAuthAdmin } from "../models/wp_options"

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
    const authObject = await reqAuth(req.token);
    if (!authObject.success) {
      return authObject;
    }

    return { success: true, msg: "success", data: await wp_options.find() };
  }

  // get a single option from the database
  async getOption(req) {
    const authObject = await reqAuth(req.token);
    if (!authObject.success) {
      return authObject;
    }

    return { success: true, msg: "success", data: await wp_options.find({ option_name: req.body.option_name }) };
  }

  // update a single option in the database
  async updateOption(req) {
    const authObject = await reqAuthAdmin(req.token);
    if (!authObject.success) {
      return authObject;
    }

    
  }







}