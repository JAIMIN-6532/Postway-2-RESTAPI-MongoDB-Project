import express from "express";
import PostController from "./post.controller.js";

const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/", (req, res, next) => {
  postController.createPost(req, res, next);
});

postRouter.get("/all", (req, res, next) => {
  postController.getAllPosts(req, res, next);
});

postRouter.get("/:postId", (req, res, next) => {
  postController.getPostByPostId(req, res, next);
});

postRouter.get("/user/:userId", (req, res, next) => {
  postController.getPostByUserId(req, res, next);
});

postRouter.delete("/:postId", (req, res, next) => {
  postController.deletePostByPostId(req, res, next);
});

postRouter.put("/:postId", (req, res, next) => {
    postController.updatePostByPostId(req, res, next);
  });
  
export default postRouter;
