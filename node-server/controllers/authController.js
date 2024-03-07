const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return resizeBy
      .status(400)
      .json({ message: "Username, email and password are required!" });

  try {
    const findMatchedUser = await User.findOne({ username: user });

    if (!findMatchedUser) {
      return res.sendStatus(404).json({ message: "User not found." });
    }
    const passwordMatch = await bcrypt.compare(pwd, findMatchedUser.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
    }
    res.status(201).json({ message: "Authentication successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
