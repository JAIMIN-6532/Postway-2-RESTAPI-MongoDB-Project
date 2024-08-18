import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export default class UserController {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    const { name, email, password, gender } = req.body;
    try {
      const hashedpassword = await bcrypt.hash(password, 12);
      const newUser = await this.UserRepository.signUp(
        name,
        email,
        hashedpassword,
        gender
      );
      res.status(201).send(newUser);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.UserRepository.findUserByEmail(email);
      if (!user) {
        return res.status(400).send("Invalid Credantials Provided");
      } else {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          //creating token for user
          const token = jwt.sign(
            {
              user: user._id,
              email: user.email,
            },
            process.env.SECRET,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({ user: user, token });
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async getUserById(req, res, next) {
    try {
      const userId = req.params.userId;    // in routes :userId that's why req.params.userId
      console.log(userId);
      const user = await this.UserRepository.getUserById(userId);
      console.log(user);
      if (user) {
        res.status(200).send(user);
      } else {
        return res.status(400).send("user not found");
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async getAllUsers(req,res,next){
  
  try{
    const users = await this.UserRepository.getAllUsers();
    if(users){
        res.status(200).send(users);
    }else{
        return res.status(400).send("users not found");
    }
  }catch (err) {
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}

async updateDetails(req, res,next) {
    try {
      const userId = req.params.userId; // Retrieve userId from the URL parameters
      const updateData = req.body; // Get the updated data from the request body

      // Call the repository method to update the user
      const updatedUser = await this.UserRepository.updateUserDetails(userId, updateData);

      if (updatedUser) {
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.log("Error in updateUserDetails controller:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export const userLogout = (req, res, next) => {
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};
