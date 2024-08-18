import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtAuth = (req, res, next) => {
  //1 read the token
  const token = req.headers["authorization"];
  console.log(token);

  //2if no token return error

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //3.check if token is valid or not
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    console.log("JWT Payload:", payload);
    req.userID = payload.user;
    console.log("jwt" , req.userID);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
  // 5. call next middleware
  next();
};
export default jwtAuth;
