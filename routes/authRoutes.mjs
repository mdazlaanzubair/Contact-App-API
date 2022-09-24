import express from "express";
import {
  login,
  signup,
} from "../controllers/authController.mjs";

// invoking express router
const router = express.Router();

// routes to user controller
router.post("/login", login);
router.post("/signup", signup);

// exporting router
export default router;
