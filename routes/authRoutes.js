import express from "express";
import { validateUser, validateLoginUser } from "../validate/user.js";
import { login, signup } from "../controllers/authControllers.js";

const router = express.Router();

// Define your authentication routes using the router
router.post("/signup", signup);
router.post("/login", login);

// Export the router to be used in the main app file
export default router;
