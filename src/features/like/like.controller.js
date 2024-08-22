import LikeRepository from "./like.repository.js";
import { PostModel } from "../post/postSchema.js";
import { CommentModel } from "../comment/commentSchema.js";


export default class LikeController {
    constructor() {
        this.LikeRepository = new LikeRepository();
    }

    async getLikes(req, res, next) {
        try {
            const { id } = req.params.id; // Extract ID from params
            const likes = await this.LikeRepository.getLikesForPostOrComment(id);
            res.json({ count: likes.length, users: likes });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching likes', error });
        }
    }

    async toggleLike(req, res, next) {
        try {
            const { id } = req.params; // Extract ID from params
            const userId = req.userID; // Extract user ID from request context
            console.log(id);
            // Determine if the ID belongs to a post or a comment
            const post = await PostModel.findById(id);
            console.log(post);

            const comment = await CommentModel.findById(id);
            console.log(comment);

            let targetModel;
            if (post) {
                targetModel = PostModel;
            } else if (comment) {
                targetModel = CommentModel;
            } else {
                return res.status(404).json({ message: 'Post or Comment not found' });
            }

            // Check if the user has already liked the item
            const likeExists = await this.LikeRepository.checkLike(id, userId);

            if (likeExists) {
                // If a like exists, remove it
                await this.LikeRepository.removeLike(id, userId);

                // Update the likes array in the target model
                await targetModel.updateOne(
                    { _id: id },
                    { $pull: { likes: userId } }
                );

                res.status(200).json({ message: 'Like removed' });
            } else {
                // If no like exists, add a new like
                await this.LikeRepository.addLike(id, userId);

                // Update the likes array in the target model
                await targetModel.updateOne(
                    { _id: id },
                    { $addToSet: { likes: userId } } // Use $addToSet to avoid duplicate likes
                );

                res.status(200).json({ message: 'Like added' });
            }
        } catch (err) {
            console.error('Error toggling like:', err); // Log error details
            res.status(500).json({ message: 'Error toggling like', error: err });
        }
    }
}
