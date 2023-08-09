import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  // console.log("Hello yes trying to register");
  try {
    // console.log(req.body);
    const { name, email, password, phone, address, role, answer } = req.body;
    // console.log(name);
    // Validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is Required" });
    }

    // Existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Rigisteration",
    });
  }
};

// Post Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or pasword",
      });
    }

    // checking user Exist or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "check creditential",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: "True",
      message: "Sucessful login",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      err,
    });
  }
};

// Forgot Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is Required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is Required" });
    }
    // checking
    const user = await userModel.findOne({ email, answer });
    // Validation
    console.log("user");
    console.log(email);
    // console.log(answer);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findOneAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Succesfully Changed Password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went wrong with forget Password",
      error,
    });
  }
};

// Update Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);

    // If Password not sent
    if (password && password.length < 2) {
      return res.json({
        error: "Password is Required and minimum 3 character",
      });
    }
    console.log(name + " " + email + " " + password + " " + address + " " + phone);
    let hashPass = user.password;
    if (password) {
      hashPass = await hashPassword(password);
    }
    console.log(name + " " + email + " " + hashPass + " " + address + " " + phone);
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        password: hashPass,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Successfully Updated the User Profile",
      updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updating Profile",
    });
  }
};

// Get Order 
export const getOrdersController = async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
    // const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
    res.json(orders);
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error will geting order",
      error
    })
  }
}


// Get All Order 
export const getAllOrdersController = async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await orderModel.find().populate("products", "-photo").populate("buyer", "name").sort({ createdAt: "-1" });
    res.json(orders);
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error will geting order",
      error
    })
  }
}

// Change Order Status
export const orderStatusController=async(req,res)=>{
  try{
    const {orderId}=req.params;
    const {status}=req.body;
    const orders=await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
    res.json(orders);
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error while Updating Order",
      error
    })
  }
}

// Test Controller
export const testController = (req, res) => {
  res.send("protected routes");
};
