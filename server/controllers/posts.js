const { response } = require("express");
const PostMessage = require("../models/postMessage.js");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); // Retrieve all post messages from the database
    res.status(200).json(postMessages); // Respond with the retrieved post messages as JSON
  } catch (error) {
    res.status(404).json({ message: error.message }); // If an error occurs, respond with an error message
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const post = req.body; // Extract the post data from the request body

  const newPost = new PostMessage(post); // Create a new post message instance with the extracted data

  try {
    await newPost.save(); // Save the new post message to the database
    res.status(201).end(); // Respond with a success status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // If an error occurs, respond with an error message
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const id = req.params.id; // Extract the post ID from the request parameters
  try {
    const result = await PostMessage.findByIdAndDelete(id); // Find and delete the post message with the specified ID
    res.send(result); // Respond with the result of the deletion operation
  } catch (error) {
    console.log(error.message); // If an error occurs, log the error message to the console
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id; // Extract the post ID from the request parameters
    const update = req.body; // Extract the updated post data from the request body
    const result = await PostMessage.findByIdAndUpdate(id, update); // Find and update the post message with the specified ID
    res.send(result); // Respond with the result of the update operation
  } catch (error) {
    console.log(error.message); // If an error occurs, log the error message to the console
  }
};
