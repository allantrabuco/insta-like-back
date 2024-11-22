import express from "express";
import routes from "./src/routes/postsRoutes.js";

const port = 3000;
const app = express();

app.use(express.static("uploads"));

routes(app);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});

// app.get("/posts/:id", (req, res) => {
//   const ix = getPostByID(req.params.id)
//   res.status(200).json(posts[ix]);
// });

// const getPostByID = (id) => {
//   return posts.findIndex((post) => {
//     return post.id === Number(id);
//   });
// }

