import { LikeModel } from "./likeSchema.js";
import { PostModel } from "../post/postSchema.js";

export default class LikeRepository {
    async getLikesForPostOrComment(id) {
        try {
            // Find likes by postId or commentId and populate user information
            return await LikeModel.find({ $or: [{ postId: id }, { commentId: id }] })
                .populate('userId', 'id name email') // Populate user information
                .exec();
        } catch (error) {
            throw new Error(`Error fetching likes: ${error.message}`);
        }
    }

    async checkLike(itemId, userId) {
        try {
            // Check if the user has liked the post or comment
            return await LikeModel.findOne({
                $or: [
                    { postId: itemId, userId },
                    { commentId: itemId, userId }
                ]
            });
        } catch (error) {
            console.log(error);
            // throw new Error(`Error checking like: ${error.message}`);
        }
    }

    async addLike(itemId, userId) {
        try {
            // Create a new like entry
            const newLike = new LikeModel({
                userId,
                postId: itemId, //id as postid
            });
            await PostModel.findByIdAndUpdate(itemId,{$push:{like:newLike._id}},{new:true})
            return await newLike.save();
        } catch (error) {
            console.log(error);
            throw new Error(`Error adding like: ${error.message}`);
        }
    }

    async removeLike(itemId, userId) {
        try {
            // Remove the like entry
            
            const like = await LikeModel.findOneAndDelete({
                $or: [
                    { postId: itemId, userId },
                    { commentId: itemId, userId }
                ]
            });

            if (like) {
                // Remove the like reference from the post's like array
                await PostModel.findByIdAndUpdate(itemId, { $pull: { like: like._id } }, { new: true });
            }

            return like;
        } catch (error) {
            throw new Error(`Error removing like: ${error.message}`);
        }
    }
}
