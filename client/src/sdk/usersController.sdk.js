/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class UsersController {
      static remote = new Remote("https://5ugnm6bumqomligeyuh5h7ffkm0qmpvh.lambda-url.eu-central-1.on.aws/")
  
      static async register(req) {
          return UsersController.remote.call("UsersController.register", req)  
      }
  
      static async registerAdmin(email, password, nicename) {
          return UsersController.remote.call("UsersController.registerAdmin", email, password, nicename)  
      }
  
      static async registerEditor(email, password, nicename) {
          return UsersController.remote.call("UsersController.registerEditor", email, password, nicename)  
      }
  
      static async getAllUsers(req) {
          return UsersController.remote.call("UsersController.getAllUsers", req)  
      }
  
      static async updateUser(req) {
          return UsersController.remote.call("UsersController.updateUser", req)  
      }
  
      static async deleteUser(req) {
          return UsersController.remote.call("UsersController.deleteUser", req)  
      }
  
      static async logout(req) {
          return UsersController.remote.call("UsersController.logout", req)  
      }
  
      static async login(email, password) {
          return UsersController.remote.call("UsersController.login", email, password)  
      }
  
      static async checkSession(req) {
          return UsersController.remote.call("UsersController.checkSession", req)  
      }
  
      
  }
  
  export { Remote };
  