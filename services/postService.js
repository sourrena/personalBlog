const fs = require("fs");
const path = require("path");

const postsFilePath = path.join(__dirname, "..", "data", "posts.json");

function getPosts() {
  const postsData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(postsData);
}

function savePosts(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

function getPostById(id) {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
}

function createPost({ title, summary, content }) {
  const posts = getPosts();

  const newPost = {
    id: Math.max(...posts.map((post) => post.id), 0) + 1,
    title,
    summary,
    content
  };

  posts.push(newPost);
  savePosts(posts);

  return newPost;
}

function updatePost(id, updatedData) {
  const posts = getPosts();
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return null;
  }

  post.title = updatedData.title;
  post.summary = updatedData.summary;
  post.content = updatedData.content;

  savePosts(posts);
  return post;
}

function deletePost(id) {
  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) {
    return false;
  }

  savePosts(filteredPosts);
  return true;
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};