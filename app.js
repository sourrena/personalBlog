const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const postsFilePath = path.join(__dirname, "data", "posts.json");

function getPosts() {
  const postsData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(postsData);
}

function savePosts(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
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

app.get("/admin/new", (req, res) => {
  res.render("admin-new");
});

app.post("/admin/new", (req, res) => {
  const posts = getPosts();

  const title = req.body.title.trim();
  const summary = req.body.summary.trim();
  const content = req.body.content.trim();

  if (!title || !summary || !content) {
  return res.status(400).send("All fields are required");
}

  const newPost = {
    id: Math.max(...posts.map(post => post.id), 0) + 1,
    title,
    summary,
    content
  };

  posts.push(newPost);

  savePosts(posts);

  res.redirect("/");
});

app.get("/admin/edit/:id", (req, res) => {
  const posts = getPosts();
  const postId = Number(req.params.id);
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("admin-edit", { post });
});

app.post("/admin/edit/:id", (req, res) => {
  const posts = getPosts();
  const postId = Number(req.params.id);
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.title = req.body.title;
  post.summary = req.body.summary;
  post.content = req.body.content;

  savePosts(posts);

  res.redirect(`/posts/${postId}`);
});

app.post("/admin/delete/:id", (req, res) => {
  const posts = getPosts();
  const postId = Number(req.params.id);

  const filteredPosts = posts.filter((post) => post.id !== postId);

  savePosts(filteredPosts);

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});