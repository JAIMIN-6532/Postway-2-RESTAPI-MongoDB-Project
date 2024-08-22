import { ObjectId } from "mongodb";
import FriendModel from "./friendshipSchema.js";
import mongoose from "mongoose";
import { UserModel } from "../user/userSchema.js";

export default class FriendRepository{

    async getFriends(id){
        return await FriendModel.find({
                 userId: id, status: 'accepted'      
        }).populate('friendId', 'name email');
    }

    async getPendingRequests(id){
      return await FriendModel.find({
            userId: id,  // This will find all requests initiated by the user
            status: 'pending'
        }).populate('friendId', 'id name email'); 
    }

    async toggleFriendship(userId, friendId) {
        try {
            // Check if a friendship already exists between the two users
            // friendId = String(friendId);
            let friendship = await FriendModel.findOne({
                userId: userId,
                friendId: friendId
            });

            if (!friendship) {
                // No existing friendship, create a new one with 'pending' status
                friendship = new FriendModel({
                    userId: userId,
                    friendId: friendId,
                    status: 'pending'
                });
                await friendship.save();
                return { message: 'Friend request sent', friendship };
            } else {
                // Friendship exists, remove it (either cancel request or unfriend)
                await FriendModel.deleteOne({ _id: friendship._id });
                return { message: 'Friendship removed or request canceled' };
            }
        } catch (error) {
            throw new Error(`Error toggling friendship: ${error.message}`);
        }
    }

    async respondToRequest(userId, friendId, response) {
        try {
            const status = response === 'accept' ? 'accepted' : 'rejected';
    
            console.log('Updating request');
            console.log('userId:', userId);
            console.log('friendId:', friendId);
            console.log('status:', status);
    
            const request = await FriendModel.findOneAndUpdate(
                { userId: userId, friendId: friendId, status: 'pending' },
                { status, updatedAt: Date.now() },
                { new: true }
            );
    
            if (!request) {
                return { message: 'Request not found or already responded' };
            }

            if (status === 'accepted') {
                await UserModel.findByIdAndUpdate(userId, {
                    $addToSet: { friends: friendId }
                });
    
                await UserModel.findByIdAndUpdate(friendId, {
                    $addToSet: { friends: userId }
                });
            }
    
            return { message: `Request ${status}`, request };
        } catch (error) {
            throw new Error(`Error responding to request: ${error.message}`);
        }
    }
}

