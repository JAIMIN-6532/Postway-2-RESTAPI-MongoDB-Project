import { ObjectId } from "mongodb";
import { CommentModel } from "./commentSchema.js";
import { PostModel } from "../post/postSchema.js";

export default class CommentRepository {
  async postComment(postId, author, comment) {
    try {
      const newComment = await new CommentModel({
        post: new ObjectId(postId),
        author: new ObjectId(author),
        comment: comment,
      });
      await newComment.save();

      await PostModel.findByIdAndUpdate(postId,{$push:{comment:newComment._id}},{new:true})

      return newComment;
    } catch (err) {
      return res.status(400).send("something wrong with db");
    }
  }

  async getCommentByPostId(postId){
    try{
        const comments = await CommentModel.find({post:new ObjectId(postId)});
        return comments;
    }catch (err) {
        return res.status(400).send("something wrong with db");
      }
   
  }

  async deleteCommentByCommentId(commentId){
    try{
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);

        // await PostModel.findByIdAndUpdate(
        //     postId,
        //     {
            //   $pull: { comment: commentId }
        //     }
        //   );
        return deletedComment;

    }catch (err) {
        return res.status(400).send("something wrong with db");
      }
   
  }

  async updateCommentByCommentId(commentId,data){
    try{
      const updatedComment = await CommentModel.findByIdAndUpdate(commentId,data,{new:true,runValidators:true});
      if (!updatedComment) {
          return res.status(404).send("comment not found");
      }
      return updatedComment;
    }catch(err){
      return res.status(400).send("something wrong with db");
    }
  }



}
