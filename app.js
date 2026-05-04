require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
require("./config/database");
/* const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("./services/postService"); */

const authRoutes = require("./routes/authRoutes");

const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

app.use(authRoutes);
app.use(postRoutes);
app.use(adminRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    message: "Page not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});