const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}

async function userSignup(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}
module.exports = {
  userLogin,
  userSignup,
};
