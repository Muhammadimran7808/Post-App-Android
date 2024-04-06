import postModel from "../models/postModel.js";

export const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Title is required",
      });
    }
    if (!description) {
      return res.status(400).send({
        success: false,
        message: "Description is required",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllUserPostController = async (req, res) => {
  try {
    const userPosts = await postModel
      .find({ postedBy: req.auth._id })
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
