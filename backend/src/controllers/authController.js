const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Handle login or register on POST.
exports.post_login = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username or password is not correct" });
  }

  try {
    const user = await User.findOne({ username });

    // If the user is not found, return an error
    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or password is not correct" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Username or password is not correct" });
    }

    // Generate a token for the user
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({ token, username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.post_register = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username or password is not correct" });
  }

  if (
    username.length <= 8 ||
    password.length <= 8 ||
    username.length >= 20 ||
    password.length >= 20
  ) {
    return res
      .status(401)
      .json({
        message:
          "Both username and password should be more than 8 characters and less than 20 characters",
      });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ username });

    // If the user exists, return an error
    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
