import fs from "fs";
import { getAllPosts, getPost, createPost, changePost } from "../models/postsModel.js";
import generateDescriptionWithGemini from "../services/geminiService.js"
/**
 * Retrieves a list of all posts
 */
export const listPosts = async (req, res) => {
  const posts = await getAllPosts();
  res.status(200).json(posts);
};

export const onePost = async (req, res) => {
  const postId = req.params.id;
  const post = await getPost(postId)
  res.status(200).json(post);
}

/**
 * Creates a new post
 */
export const addPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await createPost(post);
    res.status(200).json(newPost);
  } catch (error) {
    console.error("oops! something went wrong! :-(\n", error.message)
    res.status(500).json({ "Error": "Request failed" });
  }
};

/**
 * Update post
 */
export const updatePost = async (req, res) => {
  const postId = req.params.id;

  const currentPost = await getPost(postId)

  const aImageURL = currentPost.imageURL.split(".")
  const fileExtension = aImageURL[aImageURL.length - 1];
  const imageURL = `http://localhost:3000/${postId}.${fileExtension}`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${postId}.${fileExtension}`);
    const description = await generateDescriptionWithGemini(imageBuffer);

    const post = {
      description,
      imageURL,
      imageAlt: req.body.imageAlt
    };

    const newPost = await changePost(postId, post);

    res.status(200).json(newPost);
  } catch (error) {
    console.error("oops! something went wrong! :-(\n", error.message)
    res.status(500).json({ "Error": "Request failed" });
  }
};

/**
 * Handles image uploads and creates a new post.
 */
export const imageUpload = async (req, res) => {
  const fileExtension = req.file.mimetype.split("/")[1];

  const post = {
    description: "",
    imageURL: req.file.originalname,
    imageAlt: ""
  };

  try {
    const newPost = await createPost(post);
    const image = `uploads/${newPost.insertedId}.${fileExtension === "jpeg" ? "jpg" : fileExtension}`;
    fs.renameSync(req.file.path, image);
    res.status(200).json(newPost);
  } catch (error) {
    console.error("oops! something went wrong! :-(\n", error.message)
    res.status(500).json({ "Error": "Request failed" });
  }
};
