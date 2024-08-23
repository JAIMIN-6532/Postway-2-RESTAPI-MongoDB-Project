import express from "express";
import mongoose from "mongoose";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import dotenv from "dotenv";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import FriendRouter from "./src/features/friendship/friendship.routes.js";
import OtpRouter from "./src/features/otp/otp.routes.js";

dotenv.config();

const app = express();


app.use(express.json());

app.use("/api/",userRouter);

app.use("/api/posts",jwtAuth,postRouter);

app.use('/api/comments',jwtAuth,commentRouter);

app.use('/api/likes',jwtAuth,likeRouter);

app.use('/api/friends',jwtAuth,FriendRouter);

app.use('/api/otp',jwtAuth,OtpRouter)

app.listen(3000,()=>{
    console.log("app is listening at 3000");
    connectUsingMongoose();
});