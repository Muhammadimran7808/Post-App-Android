import express from "express";
import { requireSignIn } from "../controllers/authController.js";
import { createPostController, getAllPostController } from "../controllers/postController.js";

const router = express.Router();

// CREATE POST || METHOD POST
router.post("/create-post", requireSignIn, createPostController);

// GET ALL POST
router.get("/all-posts", getAllPostController)

export default router;
