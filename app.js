const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const posts = [
    { id: 1, title: "First Post", summary: "This is my first blog post." },
    { id: 2, title: "Second Post", summary: "This is my second blog post." }
  ];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/:id", (req, res) => {
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