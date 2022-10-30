const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });

  // Verify all required fields present
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill out all fields to create an account.');
  }

  // Verify user with provided email doesn't already exist
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error(`User with email ${email} already exists.`);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data provided.');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check that user email exists
  const user = await User.findOne({ email });

  if (user) {
    console.log(email);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials provided.');
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Get user details' });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
