const express = require("express");
const {
  getLoginPage,
  login,
  logout
} = require("../controllers/authController");

const router = express.Router();

router.get("/login", getLoginPage);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;