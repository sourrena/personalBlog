const { createPost } = require("../services/postService");

function getNewPostPage(req, res) {
  res.render("admin-new", {
    error: null,
    formData: {
      title: "",
      summary: "",
      content: ""
    }
  });
}

function createNewPost(req, res) {
  const title = req.body.title.trim();
  const summary = req.body.summary.trim();
  const content = req.body.content.trim();

  if (!title || !summary || !content) {
    return res.status(400).render("admin-new", {
      error: "All fields are required",
      formData: {
        title,
        summary,
        content
      }
    });
  }

  createPost({ title, summary, content });

  res.redirect("/");
}

module.exports = {
  getNewPostPage,
  createNewPost
};