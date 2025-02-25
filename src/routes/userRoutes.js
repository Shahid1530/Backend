import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import multer from "multer";
const router = express.Router();
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null,`${req.body.name}.${file.originalname.split(".")[1]}`);
    }
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login",loginUser);

export default router;
