const { getPostById } = require("../services/postService");

function findPostOr404(req, res) {
  const postId = Number(req.params.id);
  const post = getPostById(postId);

  if (!post) {
    res.status(404).render("404", {
      message: "Post not found"
    });

    return null;
  }

  return post;
}

module.exports = {
  findPostOr404
};