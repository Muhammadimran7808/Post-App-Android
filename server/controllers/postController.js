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
