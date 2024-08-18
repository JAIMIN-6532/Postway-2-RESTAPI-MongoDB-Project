import CommentRepository from "./comment.repository.js";

export default class CommentController {
  constructor() {
    this.CommentRepository = new CommentRepository();
  }

  
  async postComment(req, res, next) {
    try {
      const postId = req.params.postId;
      const { comment, author } = req.body;
      const commentToPost = await this.CommentRepository.postComment(
        postId,
        author,
        comment
      );
      if (commentToPost) {
        res.status(201).send(commentToPost);
      } else {
        return res.status(400).send("comment is not posted");
      }
    } catch (err) {
      console.log(err);
      //throw err
    }
  }


  async getCommentByPostId(req, res, next) {
    try {
      const postId = req.params.postId;
      const comments = await this.CommentRepository.getCommentByPostId(postId);
      if (comments) {
        res.status(200).send(comments);
      } else {
        return res.status(400).send("comments are not found");
      }
    } catch (err) {
      console.log(err);
      //throw err
    }
  }



  async deleteCommentByCommentId(req,res,next){
    try{
        const commentId = req.params.commentId;
        const deletedComment = await this.CommentRepository.deleteCommentByCommentId(commentId);
        if(deletedComment){
            res.status(200).send(deletedComment);
        }else{
            return res.status(400).send("comment is not deleted");
        }

    }catch(err){
        console.log(err);
      //throw err
    }
  }
  async updateCommentByCommentId(req,res,next){
    try{
        const commentId = req.params.commentId;
        const data = req.body;
        const updatedComment = await this.CommentRepository.updateCommentByCommentId(commentId,data);
        if(updatedComment){
            res.status(200).send(updatedComment);
        }else{
            return res.status(400).send("comment is not deleted");
        }

    }catch(err){
        console.log(err);
      //throw err
    }
  }
}
