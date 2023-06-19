const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");

require("dotenv").config();
const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/posts", postsRoute);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))
  )
  .catch((error) => {
    console.log(error.message);
    // Handle the error appropriately
  });
