const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "blog.db");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
    return;
  }

  console.log("Connected to SQLite database");
});

db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`ALTER TABLE posts ADD COLUMN created_at TEXT`, (error) => {
  if (error && !error.message.includes("duplicate column name")) {
    console.error("Failed to add created_at column:", error.message);
  }
});

db.run(`ALTER TABLE posts ADD COLUMN updated_at TEXT`, (error) => {
  if (error && !error.message.includes("duplicate column name")) {
    console.error("Failed to add updated_at column:", error.message);
  }
});

module.exports = db;