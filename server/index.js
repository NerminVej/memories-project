const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");

// Load environment variables from the .env file
require("dotenv").config();
const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON data in the request body
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mount the postsRoute middleware at the "/posts" URL prefix
app.use("/posts", postsRoute);

// Connect to the MongoDB database and start the server
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))
  )
  .catch((error) => {
    console.log(error.message);
    // Handle the error appropriately
  });
