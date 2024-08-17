import express from "express";
import UserController from "./user.controller.js";
import { userLogout } from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/users/signup',(req,res,next)=>{
    userController.signUp(req,res,next)
});
userRouter.post('/user/signin',(req,res,next)=>{
    userController.signIn(req,res,next)
});
userRouter.post('/users/logout',(req,res,next)=>{
    userLogout(req,res,next)
});
userRouter.get("/users/get-details/:userId",(req,res,next)=>{
    userController.getUserById(req,res,next)
});
userRouter.get("/users/get-all-details",(req,res,next)=>{
    userController.getAllUsers(req,res,next)
});
userRouter.put("/users/update-details/:userId",(req,res,next)=>{
    userController.updateDetails(req,res,next)
})




export default userRouter;