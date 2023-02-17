/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class OptionsController {
      static remote = new Remote("https://zwar2u2742fyvvyoihyjjkzi3q0xtzdh.lambda-url.eu-central-1.on.aws/")
  
      static async getOptions(req) {
          return OptionsController.remote.call("OptionsController.getOptions", req)  
      }
  
      static async getOption(req) {
          return OptionsController.remote.call("OptionsController.getOption", req)  
      }
  
      static async updateOption(req) {
          return OptionsController.remote.call("OptionsController.updateOption", req)  
      }
  
      static async deleteOption(req) {
          return OptionsController.remote.call("OptionsController.deleteOption", req)  
      }
  
      static async createOption(req) {
          return OptionsController.remote.call("OptionsController.createOption", req)  
      }
  
      
  }
  
  export { Remote };
  