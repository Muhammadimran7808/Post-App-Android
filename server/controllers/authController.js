import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

dotenv.config();

// middleware
export const requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// --------registor controller-------
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password || password.length < 6) {
      return res.send({
        message: "password is required and should 6 characters long",
      });
    }

    // check existing user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "This email is Already register. Please login",
      });
    }

    // hashing password
    const hashedPassword = await hashPassword(password);
    // save user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Register successfully. Please login",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// --------login controller-------
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }

    // check user already exist or not
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "This email is not register. Please register",
      });
    }

    // match password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    // undefined password
    user.password = undefined;
    user.profilePicture = undefined;
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// --------update profile controller-------
export const updateProfileController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // find user
    const user = await userModel.findOne({ email });

    // validation
    if (password && password.length < 6) {
      return res.send({ message: "password must be 6 characters long" });
    }

    // hashing password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // update user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassword || user.password },
      { new: true }
    );

    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile updated. Please login agains",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
};

// update profile pic controller
export const updateProfilePicController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.auth._id);

    // file get from client photo
    const file = getDataUri(req.file);

    // delete existing picture
    await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
    console.log(user.profilePicture.public_id);

    // update picture
    const result = await cloudinary.v2.uploader.upload(file);

    user.profilePicture = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    // save user
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "Profile picture updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating profile picture",
      error,
    });
  }
};

// get user profile controller
export const getProfilePicController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.auth._id);

    const profilePicture  = user.profilePicture;
    res.status(200).send({
      success: true,
      message: "Profile picture",
      profilePicture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting profile picture",
      error,
    });
  }
};
