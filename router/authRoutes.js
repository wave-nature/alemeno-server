import express from "express";
import { validateUser, validateLoginUser } from "../validate/user";

const router = express.Router();

// Define your authentication routes using the router
router.get("/login", (req, res) => {
  // Your login route logic here
});

router.post("/signup", validateUser, signup);

// Export the router to be used in the main app file
export default router;
