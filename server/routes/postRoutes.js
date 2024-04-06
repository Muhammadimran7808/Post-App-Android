import express from "express";
import { requireSignIn } from "../controllers/authController.js";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getAllUserPostController,
} from "../controllers/postController.js";

const router = express.Router();

// CREATE POST || METHOD POST
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POST
router.get("/all-posts", getAllPostController);

// GET User's POST
router.get("/user-posts", requireSignIn, getAllUserPostController);

// DELETE POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

export default router;
