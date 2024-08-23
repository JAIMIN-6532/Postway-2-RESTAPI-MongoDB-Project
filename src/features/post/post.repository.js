import { ObjectId } from "mongodb";
import { PostModel } from "./postSchema.js";
import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/Applicationerror.js";
 
export default class PostRepository {
  async createPost(userId, caption, author, imgUrl) {
    try {
      // const ObjectId = mongoose.Types;
      const newPost = await new PostModel({
        caption: caption,
        author: author,
        imgUrl: imgUrl,
      });
      // res.status(201).send(newPost);
      await newPost.save();
      return newPost;
    } catch (err) {
      console.log(err);
      //throw error
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAllPosts() {
    try {
      const allPosts = await PostModel.find({});
      return allPosts;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getPostByPostId(postId) {
    try {
      const posts = await PostModel.findById(postId);
      return posts;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getPostByUserId(userId) {
    try {
      const posts = await PostModel.find({ author: new mongoose.Types.ObjectId(userId) });
      return posts;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async deletePostByPostId(postId){
    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        return deletedPost;
      } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
  }

  async updatePostByPostId(postId,data){
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(postId,data,{new:true,runValidators:true});
        if (!updatedPost) {
            return res.status(404).send("Post not found");
        }
        return updatedPost;
      } catch (err) {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
  }
}
