const { getPosts } = require("../services/postService");

const { findPostOr404 } = require("../helpers/postHelpers");

/* old function with json
function getHomePage(req, res) {
  const posts = getPosts();
  res.render("index", { posts });
} */

function getHomePage(req, res) {
  getPosts((posts) => {
    res.render("index", { posts });
  });
}

/* old function
function getSinglePostPage(req, res) {
  const post = findPostOr404(req, res);

  if (!post) {
    return;
  }

  res.render("post", { post });
} */

function getSinglePostPage(req, res) {
  findPostOr404(req, res, (post) => {
    if (!post) {
      return;
    }

    res.render("post", { post });
  });
}

module.exports = {
  getHomePage,
  getSinglePostPage
};