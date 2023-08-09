import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { compareSync } from "bcrypt";
// Protected Routes Token Base
export const requireSignIn = async (req, res, next) => {
  try {
    // console.log("Hello Sign in Checking");
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
// Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = await userModel.findById(req.user._id);
    console.log(user.role === 1);
    // console.log(user);
    if (user.role !== 1) {
      res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: "false",
      message: "error in admin midleware",
    });
  }
};
