const { getPosts } = require("../services/postService");

const { findPostOr404 } = require("../helpers/postHelpers");

function getHomePage(req, res) {
  const posts = getPosts();
  res.render("index", { posts });
}

function getSinglePostPage(req, res) {
  const post = findPostOr404(req, res);

  if (!post) {
    return;
  }

  res.render("post", { post });
}

module.exports = {
  getHomePage,
  getSinglePostPage
};