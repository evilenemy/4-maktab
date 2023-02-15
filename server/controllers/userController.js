const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// GET USERS
const getUsers = async (req, res) => {
  if (req.user.role == "admin") {
    const users = await User.find({});

    res.status(200).json(users);
  } else {
    res.status(400).json({ error: "You are not a admin" });
  }
};

// GET SINGLE
const getUser = async (req, res) => {
  if (req.user.role == "admin") {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } else {
    res.status(400).json({ error: "You are not a admin" });
  }
};

// login a user
const loginUser = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.login(login, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ login: user.login, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  getUser,
  getUsers,
};
