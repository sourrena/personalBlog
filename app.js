const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const postsFilePath = path.join(__dirname, "data", "posts.json");

function getPosts() {
  const postsData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(postsData);
}

app.get("/", (req, res) => {
  const posts = getPosts();
  res.render("index", { posts });
});

app.get("/posts/:id", (req, res) => {
  const posts = getPosts();
  const postId = Number(req.params.id);
  const post = posts.find(post => post.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post", { post });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});