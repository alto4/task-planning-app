const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const authGuard = asyncHandler(async (req, res, next) => {
  let token;
  console.log('authGuard called');

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user with tokens user id, minus hashed passwor
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized.');
    }

    if (!token) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized. A token is required.');
    }
  }

  // res.status(401);
  // throw new Error('Not authorized. A token is required.');
});

module.exports = { authGuard };
