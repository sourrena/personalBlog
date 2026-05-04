const {
  createPost,
  getPostById,
  updatePost,
  deletePost
} = require("../services/postService");

const { findPostOr404 } = require("../helpers/postHelpers");

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

  /* old method using json as db
  createPost({ title, summary, content }); */

  createPost({ title, summary, content }, (newPost) => {
  console.log(newPost);
  if (!newPost) {
    return res.status(500).render("admin-new", {
      error: "Something went wrong. Please try again.",
      formData: {
        title,
        summary,
        content
      }
    });
  }

  res.redirect("/");
});
}

/* old function
function getEditPostPage(req, res) {
  const post = findPostOr404(req, res);

  if (!post) {
    return;
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
} */
function getEditPostPage(req, res) {
  findPostOr404(req, res, (post) => {
    if (!post) {
      return;
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
}

/* old function
function editPost(req, res) {
  const existingPost = findPostOr404(req, res);

  if (!existingPost) {
    return;
  }

  const postId = existingPost.id;

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
} */

function editPost(req, res) {
  findPostOr404(req, res, (existingPost) => {
    if (!existingPost) {
      return;
    }

    const postId = existingPost.id;

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

    /* updatePost(postId, { title, summary, content });

    res.redirect(`/posts/${postId}`); */

    updatePost(postId, { title, summary, content }, (updatedPost) => {
      console.log(updatedPost)
      if (!updatedPost) {
    return res.status(500).render("admin-edit", {
      post: existingPost,
      error: "Failed to update post",
      formData: {
        title,
        summary,
        content
      }
    });
  }

  res.redirect(`/posts/${postId}`);
});
  });
}

/* function deleteExistingPost(req, res) {
  const postId = Number(req.params.id);
  const deleted = deletePost(postId);

  if (!deleted) {
    return res.status(404).render("404", { message: "Post not found" });
  }

  res.redirect("/");
} */

function deleteExistingPost(req, res) {
  const postId = Number(req.params.id);

  deletePost(postId, (deleted) => {
    if (!deleted) {
      return res.status(404).render("404", {
        message: "Post not found"
      });
    }

    res.redirect("/");
  });
}

module.exports = {
  getNewPostPage,
  createNewPost,
  getEditPostPage,
  editPost,
  deleteExistingPost
};