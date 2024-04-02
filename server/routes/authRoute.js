import express from "express";
import {
  loginController,
  registerController,
  requireSignIn,
  updateProfileController,
} from "../controllers/authController.js";

// roter object
const router = express.Router();

// ----------Routing---------

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// Update Profile || PUT
router.put("/update-profile", requireSignIn, updateProfileController);

export default router;
