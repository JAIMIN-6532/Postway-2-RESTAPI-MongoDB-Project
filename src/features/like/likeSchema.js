import express from 'express';
import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
      createdAt: {
        type: Date,
        default: Date.now,  
      },
});

export const LikeModel = new mongoose.model("LikeModel", LikeSchema );

