const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  if (!user || !pwd || !email)
    return res
      .sendStatus(400)
      .json({ message: "Username, email and password are required!" });

  const duplicateUsername = await User.findOne({ username: user }).exec();
  const duplicateEmail = await User.findOne({ email }).exec();
  if (duplicateEmail || duplicateUsername) return res.sendStatus(409); //conflitto

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      email,
      password: hashedPwd,
    });
    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
