/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class PostsController {
      static remote = new Remote("https://panve6rm3rttz6zqx3dz6huyim0ywtky.lambda-url.eu-central-1.on.aws/")
  
      static async createPost(req) {
          return PostsController.remote.call("PostsController.createPost", req)  
      }
  
      static async updatePost(req) {
          return PostsController.remote.call("PostsController.updatePost", req)  
      }
  
      static async getAPost(req) {
          return PostsController.remote.call("PostsController.getAPost", req)  
      }
  
      static async getAllPosts() {
          return PostsController.remote.call("PostsController.getAllPosts")  
      }
      
      
  }
  
  export { Remote };
  