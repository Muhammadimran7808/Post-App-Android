import express from "express";
import { requireSignIn } from "../controllers/authController.js";
import { createPostController } from "../controllers/postController.js";

const router = express.Router();

// CREATE POST || METHOD POST
router.post("/create-post", requireSignIn, createPostController);

export default router;
