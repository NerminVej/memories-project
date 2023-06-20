const mongoose = require("mongoose");

// Define the schema for a post
const postSchema = new mongoose.Schema({
  title: String, // Title of the post
  message: String, // Content/message of the post
  creator: String, // Creator/author of the post
  tags: [String], // Array of tags associated with the post
  selectedFile: String, // File path or URL of an associated image/file
  likeCount: {
    type: Number,
    default: 0, // Default like count for the post is set to 0
  },
  createdAt: {
    type: Date,
    default: new Date(), // Default creation date is set to the current date and time
  },
});

// Create a model based on the post schema
const PostMessage = mongoose.model("Post", postSchema);

module.exports = PostMessage;
