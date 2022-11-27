const asyncHandler = require('express-async-handler');
const { findById, findByIdAndUpdate } = require('../models/taskModel');

const Pomodoro = require('../models/pomodoroModel');
const User = require('../models/userModel');

// GET - retrieve all pomdoross
// /api/pomodoros
const getPomodoros = asyncHandler(async (req, res) => {
  const pomodoros = await Pomodoro.find({ user: req.user._id }).sort('date');

  res.status(200).json({
    pomodoros,
  });
});

// POST - create a pomodoro record if none for date
// /api/pomodoros
const createPomodoros = asyncHandler(async (req, res) => {
  const pomodoroRecord = await Pomodoro.create({
    user: req.user.id,
    count: req.body.count,
  });

  res.status(200).json(pomodoroRecord);
});

// PUT - update an existing pomodoro record
// /api/tasks/:id
const updatePomodoros = asyncHandler(async (req, res) => {
  try {
    const pomodoroRecord = await Pomodoro.findById(req.body.id);

    if (!pomodoroRecord) {
      res.status(400);
      throw new Error('Pomodoro record not found.');
    }

    // Check for user
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(401);
      throw new Error('User not found.');
    }

    await Pomodoro.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.body.id,
      },
      req.body
    );
    const updatedPomodoroRecord = await Pomodoro.findById(req.body.id);

    res.status(200).json(updatedPomodoroRecord);
  } catch (error) {
    console.error('Error updating pomodoro record => ', error);
  }
});

module.exports = {
  createPomodoros,
  getPomodoros,
  updatePomodoros,
};
