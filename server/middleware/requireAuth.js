const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization)
    res.status(401).json({ error: "Authorization token required." });

  // authorization looks like 'Bearer ...token...' -> needs to be split
  const token = authorization.split(" ")[1];

  // check the token

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;
