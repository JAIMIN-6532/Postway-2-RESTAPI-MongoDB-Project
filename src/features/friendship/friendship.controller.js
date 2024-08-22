import mongoose from "mongoose";
import FriendRepository from "./friendship.repository.js";
import FriendModel from "./friendshipSchema.js";

export default class FriendController{
    constructor(){
        this.FriendRepository = new FriendRepository();
    }

    async getFriends(req,res,next){
        try{
            const id = req.params.userId;
            const friends = await this.FriendRepository.getFriends(id);
            if(friends){
                res.status(200).send(friends);
            }else{
                return res.status(400).send("no such friends!!");
    
            }
        }catch(err){
            console.log(err);
        }
       
    }
    async getPendingRequests(req,res,next){
        try{
            const id = req.userID;
            const pendingreq = await this.FriendRepository.getPendingRequests(id);
            if(pendingreq){
                res.status(200).send(pendingreq);
            }else{
                return res.status(400).send("req are not pending")
            }
        }catch(err){
            console.log(err);
        }
    }
    async toggleFriend(req,res,next){
        try {
            const userId = req.userID; // Assuming the user ID is available from the authenticated user's session or JWT
            const friendid = req.params.friendId;
            // console.log(friendId);
            const result = await this.FriendRepository.toggleFriendship(userId, friendid);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }
    async respondToRequest(req,res,next){
        try {
            const userId = req.userID;
            const friendId = req.params.friendId;
            const response = req.body.response;
    
            console.log('Received userId:', userId);
            console.log('Received friendId:', friendId);
            console.log('Received response:', response);
    
            if (response !== 'accept' && response !== 'reject') {
                return res.status(400).json({ message: 'Invalid response format' });
            }
    
            const result = await this.FriendRepository.respondToRequest(userId, friendId, response);
            console.log('Respond to request result:', result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}