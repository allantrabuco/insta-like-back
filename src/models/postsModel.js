import "dotenv/config";
import dbConnect from "../config/dbConfig.js";
import { mongoDB_database_name, mongoDB_collection_post } from "../config/constants.js";
import { ObjectId } from "mongodb";

const dbConnection = await dbConnect(process.env.MONGODB_CONNECTION);

export const getAllPosts = async () => {
  const db = dbConnection.db(mongoDB_database_name);
  const postsCollection = db.collection(mongoDB_collection_post);
  return postsCollection.find().toArray();
};

export const getPost = async (postId) => {
  const db = dbConnection.db(mongoDB_database_name);
  const postsCollection = db.collection(mongoDB_collection_post);
  const objID = ObjectId.createFromHexString(postId);
  return postsCollection.findOne({ _id: objID });
};

export const createPost = async (post) => {
  const db = dbConnection.db(mongoDB_database_name);
  const postsCollection = db.collection(mongoDB_collection_post);
  return postsCollection.insertOne(post);
};

export const changePost = async (postId, post) => {
  const db = dbConnection.db(mongoDB_database_name);
  const postsCollection = db.collection(mongoDB_collection_post);
  const objID = ObjectId.createFromHexString(postId);
  return postsCollection.updateOne({ _id: new ObjectId(objID) }, {$set:post});
};
