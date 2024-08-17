import express from "express";
import mongoose from "mongoose";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();




app.listen(3000,()=>{
    console.log("app is listening at 3000");
    connectUsingMongoose();
});