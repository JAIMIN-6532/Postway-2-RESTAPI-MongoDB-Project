import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,"user name is required"]
  },
  email: {
    type: String,
    unique:[true,"email must be unique"],
    match: [/.+\@.+\../, "Please enter a valid email"],
    required:[true,"email is required"]
  },
  password:{
    type:String,
    //validate the password by validator
    required:[true,"password is required"]
  },
  gender:{
    type: String,
    required:[true,"gender is required"]
  },
  friends:[{
    type:mongoose.Schema.Types.ObjectId,
    name:String,
    ref:'Friend'
  }]
});

export const UserModel = new mongoose.model('User',UserSchema);
