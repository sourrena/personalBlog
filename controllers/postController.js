const { getPosts, getPostById } = require("../services/postService");

function getHomePage(req, res) {
  const posts = getPosts();
  res.render("index", { posts });
}

function getSinglePostPage(req, res) {
  const postId = Number(req.params.id);
  const post = getPostById(postId);

  if (!post) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  res.render("post", { post });
}

module.exports = {
  getHomePage,
  getSinglePostPage
};