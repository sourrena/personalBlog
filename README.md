# Personal Blog (Node.js Backend Project)
Live Demo :

https://your-render-url.onrender.com

## Overview

This is a backend-focused personal blog application built with Node.js and Express.

The goal of this project is to demonstrate core backend development skills, including:

* RESTful routing
* CRUD operations
* authentication and session management
* database integration with SQLite
* clean project architecture

---

## Tech Stack

* Node.js
* Express
* SQLite
* EJS (templating)
* express-session
* bcrypt
* dotenv

---

## Features

* Public homepage with blog posts
* View individual posts
* Admin login (session-based)
* Create, edit, and delete posts (protected)
* Server-side validation
* Custom 404 page
* Timestamps for post creation and updates

---

## Project Structure

```
/routes
/controllers
/services
/helpers
/middleware
/config
/views
/public
```

---

## How to Run

1. Clone the repository:

```
git clone <your-repo-link>
cd personalBlog
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file:

```
SESSION_SECRET=your_secret
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

4. Start the server:

```
node app.js
```

5. Open:

```
http://localhost:3000
```

---

## Notes

This project was originally built using JSON file storage and later migrated to SQLite to improve scalability and demonstrate database integration.

## Architecture

This project follows a layered structure to separate concerns:

* **Routes**: define endpoints and map requests to controllers
* **Controllers**: handle request/response logic and validation
* **Services**: handle database operations (SQLite)
* **Helpers**: reusable logic (e.g., 404 handling)
* **Middleware**: authentication and request guards

This separation keeps the codebase maintainable and makes it easier to scale or replace components (e.g., switching databases).

---

## Data Flow Example

Example: editing a post

1. Request hits `/admin/edit/:id` (route)
2. Controller validates input and user session
3. Helper checks if post exists (or returns 404)
4. Service updates the post in SQLite
5. Controller redirects after success

This structure avoids mixing database logic with request handling.
