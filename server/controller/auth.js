const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Login controller for authenticating users
exports.loginUser = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all the required fields",
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with us. Please sign up to continue.",
      });
    }

    // Log the hashed password from the database and the input password
    // console.log("Stored hashed password:", user.password);
    // console.log("Provided password:", password);

    // const testPassword = "userPassword";
    // const hashedPassword = await bcrypt.hash(testPassword, 10);
    // const isMatch1 = await bcrypt.compare(testPassword, hashedPassword);
    // console.log("Password match result:", isMatch1); // Should be true

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // console.log("Password match result:", isMatch);

    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Save token to user document in database (if needed)
      // user.token = token; // Uncomment if you want to save token to database
      // await user.save(); // Uncomment if you want to save the token

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          token,
          user: {
            ...user.toObject(),
            password: undefined, // Ensure password is not sent in the response
          },
          message: "User login success",
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failure. Please try again.",
    });
  }
};
