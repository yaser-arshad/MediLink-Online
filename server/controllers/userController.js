import User from "../models/userModal.js";
import asyncHandler from "express-async-handler";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Set user data in session
  req.session.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  res.status(201).json(user);
});

const checkEmailExists = asyncHandler(async (req, res) => {
  const { email } = req.params;

  // Check if the email exists
  const user = await User.findOne({ email });
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user with the provided email exists
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    // Set user data in session
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
  console.log(user);
});

const logoutUser = asyncHandler(async (req, res) => {
  // Clear user data from session
  req.session.user = null;
  res.json({ message: 'Logged out successfully' });
});


const fetchUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Check if the user exists
  const user = await User.findById(userId);

  if (user) {
    // Return the user profile data
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export { createUser,checkEmailExists,loginUser ,logoutUser,fetchUserById};
