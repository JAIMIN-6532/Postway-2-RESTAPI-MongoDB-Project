import PostRepository from "./post.repository.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
export default class PostController {
  constructor() {
    this.PostRepository = new PostRepository();
  }
  async createPost(req, res, next) {
    try {
      const userId = req.userID;
      const { caption, author, imgUrl } = req.body;
      console.log(userId, author);
      if (userId !== author) {
        return res
          .status(403)
          .send("Forbidden: You can only create posts for your own account");
      } else {
        const newPost = await this.PostRepository.createPost(
          userId,
          caption,
          author,
          imgUrl
        );
        if (newPost) {
          res.status(201).send(newPost);
        } else {
          return res.status(400).send("post is not created");
        }
      }
    } catch (err) {
      console.log(err);
      //throw err
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const allPosts = await this.PostRepository.getAllPosts();

      if (allPosts) {
        res.status(200).send(allPosts);
      } else {
        return res.status(400).send("posts are not retrived");
      }
    } catch (err) {
      console.log(err);
      //throw err
    }
  }

  async getPostByPostId(req, res, next) {
    try {
      const postId = req.params.postId;
      const posts = await this.PostRepository.getPostByPostId(postId);
      if (posts) {
        res.status(200).send(posts);
      } else {
        return res.status(400).send("posts are not found");
      }
    } catch (err) {
      console.log(err);
      //throw err
    }
  }

  async getPostByUserId(req,res,next){
    try {
        const userId = req.params.userId;
        const posts = await this.PostRepository.getPostByUserId(userId);
        if (posts) {
          res.status(200).send(posts);
        } else {
          return res.status(400).send("posts are not found");
        }
      } catch (err) {
        console.log(err);
        //throw err
      }
  }

  async deletePostByPostId(req,res,next){
    try {
        const postId = req.params.postId;
        const deletedPost = await this.PostRepository.deletePostByPostId(postId);
        if (deletedPost) {
            console.log("post deleted successfully");
          res.status(200).send(deletedPost);
        } else {
          return res.status(400).send("posts are not found");
        }
      } catch (err) {
        console.log(err);
        //throw err
      }
  }

  async updatePostByPostId(req,res,next){
    try {
        const postId = req.params.postId;
        const updatedPost = await this.PostRepository.updatePostByPostId(postId,req.body);
        if (updatedPost) {
            console.log("post deleted successfully");
          res.status(200).send(updatedPost);
        } else {
          return res.status(400).send("posts are not found");
        }
      } catch (err) {
        console.log(err);
        //throw err 
      }
  }
}
