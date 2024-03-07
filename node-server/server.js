require("dotenv").config();
const express = require("express");
const mongoURL = process.env.MONGO_URL;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

const registerRoute = require("./userRoutes/register");
const getAllUsersRoute = require("./userRoutes/getUsers");
const loginRoute = require("./userRoutes/login");

//Enable CORS for all origins .. per tutti i domain
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/users", registerRoute);
app.use("/api/users", getAllUsersRoute);
app.use("/api/users", loginRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
