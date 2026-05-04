const db = require("../config/database");
/*
const fs = require("fs");
const path = require("path");

const postsFilePath = path.join(__dirname, "..", "data", "posts.json");

ld getPosts with json
function getPosts() {
  const postsData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(postsData);
} */

function getPosts(callback) {
  db.all("SELECT * FROM posts ORDER BY id DESC", [], (error, rows) => {
    if (error) {
      console.error("Failed to get posts:", error.message);
      return callback([]);
    }

    callback(rows);
  });
}

/* function savePosts(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

Old function with Json
 getPostById(id) {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
} */

function getPostById(id, callback) {
  const sql = "SELECT * FROM posts WHERE id = ?";

  db.get(sql, [id], (error, row) => {
    if (error) {
      console.error("Failed to get post:", error.message);
      return callback(null);
    }

    callback(row || null);
  });
}
/* old function with json
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
} */

function createPost({ title, summary, content }, callback) {
  const now = new Date().toISOString();

  const sql = `
    INSERT INTO posts (title, summary, content, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [title, summary, content, now, now], function (error) {
    if (error) {
      console.error("Failed to create post:", error.message);
      return callback(null);
    }

    callback({
      id: this.lastID,
      title,
      summary,
      content,
      created_at: now,
      updated_at: now
    });
  });
}

/* old function
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
} */

/* old function
function deletePost(id) {
  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) {
    return false;
  }

  savePosts(filteredPosts);
  return true;
}  */ 

function deletePost(id, callback) {
  const sql = "DELETE FROM posts WHERE id = ?";

  db.run(sql, [id], function (error) {
    if (error) {
      console.error("Failed to delete post:", error.message);
      return callback(false);
    }

    callback(this.changes > 0);
  });
}


function updatePost(id, updatedData, callback) {
  const now = new Date().toISOString();

const sql = `
  UPDATE posts
  SET title = ?, summary = ?, content = ?, updated_at = ?
  WHERE id = ?
`;

db.run(
  sql,
  [updatedData.title, updatedData.summary, updatedData.content, now, id],
    function (error) {
      if (error) {
        console.error("Failed to update post:", error.message);
        return callback(null);
      }

      if (this.changes === 0) {
        return callback(null);
      }

      callback({
  id,
  title: updatedData.title,
  summary: updatedData.summary,
  content: updatedData.content,
  updated_at: now
});
    }
  );
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};