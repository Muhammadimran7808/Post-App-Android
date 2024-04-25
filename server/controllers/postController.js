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

export const deletePostController = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });

    if (post.postedBy.toString() !== req.auth._id.toString()) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
    await postModel.findOneAndDelete({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // find post
    const post = await postModel.findById({ _id: req.params.id });
    // validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please fill all field",
      });
    }

    const updatedPost = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
