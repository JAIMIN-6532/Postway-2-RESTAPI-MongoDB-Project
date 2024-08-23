import mongoose from "mongoose";
import { UserModel } from "./userSchema.js";
import { ApplicationError } from "../../error-handler/Applicationerror.js";

export default class UserRepository {
  async signUp(name, email, pass, gender) {
    try {
      const newUser = new UserModel({
        name: name,
        email: email,
        password: pass,
        gender: gender,
      });
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      //throw to applicationError
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findUserByEmail(email){
    try{
        return await UserModel.findOne({email});

    }catch(err){
        console.log(err);
        //throw to applicationError
        throw new ApplicationError("Something went wrong with database", 500);

    }
  }

  async getUserById(userId){
    try{
    const user = await UserModel.findById(userId);
    console.log(user)
    return user;
    }catch(err){
        // console.log(err);
        //throw to applicationError
        throw new ApplicationError("Something went wrong with database", 500); 
    }
  }

  async getAllUsers(){
    try{
        const users = await UserModel.find({});
        return users;
    }catch(err){
        console.log(err);
        //throw to applicationError
        throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async updateUserDetails(userId, updateData) {
    try {
      // Find the user by ID and update the details
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true } // Options: return the updated document,runValidators for run schema-validators
      );

      if (!updatedUser) {
        console.log("User not found with ID:", userId);
        return null;
      }

      console.log("User updated:", updatedUser);
      return updatedUser;
    } catch (err) {
      console.log("Error while updating user:", err);
      // throw new Error("Database error");
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

}
