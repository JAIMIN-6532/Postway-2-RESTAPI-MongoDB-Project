import express from "express";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    caption:{
        required:true,
        type:String
    },
    author:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    imgUrl:{
        required:true,
        type:String,
    },
    like:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
});

export const PostModel = new mongoose.model('PostModel',PostSchema);