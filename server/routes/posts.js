const express = require("express");
const { getPosts, createPost, deletePost, updatePost } = require("../controllers/posts.js");
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/:id", updatePost);

module.exports = router;
