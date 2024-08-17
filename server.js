import express from "express";
import mongoose from "mongoose";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import dotenv from "dotenv";
import userRouter from "./src/features/user/user.routes.js";
dotenv.config();

const app = express();


app.use(express.json());
app.use("/api/",userRouter);


app.listen(3000,()=>{
    console.log("app is listening at 3000");
    connectUsingMongoose();
});