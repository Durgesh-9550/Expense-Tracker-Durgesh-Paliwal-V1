const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function (req, res, next) {
  // Retrieve the token from the 'Authorization' header
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied!!!!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!!!!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure this line sets req.user correctly
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
