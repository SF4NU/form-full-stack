require("dotenv").config();
const express = require("express");
const mongoURL = process.env.MONGO_URL;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

//Enable CORS for all origins .. per tutti i domain
app.use(cors());

app.get("/testapi", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
