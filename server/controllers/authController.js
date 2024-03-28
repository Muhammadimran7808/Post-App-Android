import userModel from "../models/userModel.js";

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
    // const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      password,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register successfully",
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
