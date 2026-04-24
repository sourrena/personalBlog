const express = require("express");
const {
  getHomePage,
  getSinglePostPage
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getHomePage);
router.get("/posts/:id", getSinglePostPage);

module.exports = router;