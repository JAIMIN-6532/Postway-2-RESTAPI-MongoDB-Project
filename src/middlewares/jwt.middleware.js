import jwt from "jsonwebtoken";

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
    const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
    req.userID = payload.userID;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
  // 5. call next middleware
  next();
};
export default jwtAuth;
