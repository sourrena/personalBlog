const express = require("express");
const path = require("path");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("./services/postService");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const {
  getHomePage,
  getSinglePostPage
} = require("./controllers/postController");

const {
  getNewPostPage,
  createNewPost
} = require("./controllers/adminController");

app.get("/", getHomePage);
app.get("/posts/:id", getSinglePostPage);

app.get("/admin/new", getNewPostPage);
app.post("/admin/new", createNewPost);

app.get("/admin/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = getPostById(postId);

  if (!post) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  res.render("admin-edit", {
    post,
    error: null,
    formData: {
      title: post.title,
      summary: post.summary,
      content: post.content
    }
  });
});

app.post("/admin/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
  const existingPost = getPostById(postId);

  if (!existingPost) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  const title = req.body.title.trim();
  const summary = req.body.summary.trim();
  const content = req.body.content.trim();

  if (!title || !summary || !content) {
    return res.status(400).render("admin-edit", {
      post: existingPost,
      error: "All fields are required",
      formData: {
        title,
        summary,
        content
      }
    });
  }

  updatePost(postId, { title, summary, content });

  res.redirect(`/posts/${postId}`);
});

app.post("/admin/delete/:id", (req, res) => {
  const postId = Number(req.params.id);
  const deleted = deletePost(postId);

  if (!deleted) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});