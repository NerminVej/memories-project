const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/posts.js");

// Create a new instance of the Express router
const router = express.Router();

// Define the routes and their corresponding controller functions
router.get("/", getPosts); // GET request to retrieve all posts
router.post("/", createPost); // POST request to create a new post
router.delete("/:id", deletePost); // DELETE request to delete a post by ID
router.post("/:id", updatePost); // POST request to update a post by ID

// Export the router to be used in the main application
module.exports = router;
