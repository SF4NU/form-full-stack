require("dotenv").config();
const express = require("express");
const mongoURL = process.env.MONGO_URL;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Schema = mongoose.Schema;
const PORT = process.env.PORT || 8000;

//Enable CORS for all origins .. per tutti i domain
app.use(cors());

app.get("/testapi", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = new mongoose.model("users", UserSchema);

app.get("/getUsers", async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData);
  console.log(userData);
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

// mongoose.connection.once("open", () => {
//   console.log("Connected to mongoDB");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
