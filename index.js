import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import multer from "multer";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import { protect } from "./src/middleware/authMiddleware.js";
import { fileURLToPath } from 'url';
dotenv.config();
connectDB();
  
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'upload' directory
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
