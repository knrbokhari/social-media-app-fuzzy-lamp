import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY;
const authMiddleWare = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   // console.log(token);
  //   if (token) {
  //     const decoded = jwt.verify(token, secret);
  //     // console.log(decoded);
  //     req.body._id = decoded?.id;
  //   }
  //   next();
  // } catch (error) {
  //   // console.log(error);
  // }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ Message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return res.status(403).send({ Message: "Forbidden access" });
    }
    req.body._id = decoded?.id;
    next();
  });
};

export default authMiddleWare;
