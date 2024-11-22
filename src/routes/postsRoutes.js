import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
};

import { listPosts, onePost, addPost, updatePost, imageUpload } from "../controllers/postsController.js";

// --- for Windows
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ dest: "./uploads", storage });

// --- for Linux or macOS
const upload = multer({ dest: "./uploads" });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/posts", listPosts);
  app.get("/posts/:id", onePost);
  app.post("/posts", addPost);
  app.post("/upload", upload.single("image"), imageUpload);
  app.put("/upload/:id", updatePost);
};

export default routes;
