import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.post("/:postId", (req, res, next) => {
  commentController.postComment(req, res, next);
});

commentRouter.get("/:postId",(req,res,next)=>{
    commentController.getCommentByPostId(req,res,next);
});

commentRouter.delete("/:commentId",(req,res,next)=>{
    commentController.deleteCommentByCommentId(req,res,next);
});
commentRouter.put("/:commentId",(req,res,next)=>{
  commentController.updateCommentByCommentId(req,res,next);
});
export default commentRouter;
