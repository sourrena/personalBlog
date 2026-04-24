const express = require("express");
const {
  getNewPostPage,
  createNewPost,
  getEditPostPage,
  editPost,
  deleteExistingPost
} = require("../controllers/adminController");

const router = express.Router();

router.get("/admin/new", getNewPostPage);
router.post("/admin/new", createNewPost);

router.get("/admin/edit/:id", getEditPostPage);
router.post("/admin/edit/:id", editPost);

router.post("/admin/delete/:id", deleteExistingPost);

module.exports = router;