const { getPostById } = require("../services/postService");

/* old function with json
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
} */

function findPostOr404(req, res, callback) {
  const postId = Number(req.params.id);

  getPostById(postId, (post) => {
    if (!post) {
      res.status(404).render("404", {
        message: "Post not found"
      });

      return callback(null);
    }

    callback(post);
  });
}

module.exports = {
  findPostOr404
};