import express from "express";
import FriendController from "./friendship.controller.js";
import mongoose from "mongoose";

const FriendRouter = express.Router();

const friendController = new FriendController();


FriendRouter.get('/get-friends/:userId',(req,res,next)=>{
    friendController.getFriends(req,res,next);
})

FriendRouter.get('/get-pending-requests',(req,res,next)=>{
    friendController.getPendingRequests(req,res,next);
})

FriendRouter.post('/toggle-friendship/:friendId',(req,res,next)=>{
    friendController.toggleFriend(req,res,next);
})

FriendRouter.post('/response-to-request/:friendId',(req,res,next)=>{
    friendController.respondToRequest(req,res,next);
})





export default FriendRouter;