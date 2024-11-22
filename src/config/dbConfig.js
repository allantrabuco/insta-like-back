import { MongoClient } from "mongodb";

export default async function dbConnect(strConnection) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(strConnection);
    console.log("Connecting to database cluster...");
    await mongoClient.connect();
    console.log("Connected to MongoDB Atlas successfully!")

    return mongoClient;
  } catch (error) {
    console.error("Database connection failed!", error);
    process.exit();
  }
};
