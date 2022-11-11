const asyncHandler = require('express-async-handler');
const { findById, findByIdAndUpdate } = require('../models/taskModel');

const Pomodoro = require('../models/pomodoroModel');
const User = require('../models/userModel');

// GET - retrieve all pomdoross
// /api/pomodoros
const getPomodoros = asyncHandler(async (req, res) => {
  console.log('req.user in getPomodoros => ', req.user);
  const pomodoros = await Pomodoro.find({ user: req.user._id }).sort('date');
  console.log('all pomdoros for user => ', pomodoros);

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
    console.log('HERE!');
    const pomodoroRecord = await Pomodoro.find({
      user: req.user._id,
      date: { $gte: new Date(`${req.body.date}T00:00:00.000Z`), $lt: new Date(`${req.body.date}T23:59:00.000Z`) },
    });

    console.log('req,body for update, mark complete => ', req.body);
    if (!pomodoroRecord) {
      // TODO: Should a new one be created here?
      res.status(400);
      throw new Error('Pomodoro record not found.');
    }

    // Check for user
    const user = await User.findById(req.user._id);

    console.log('user req => ', user);
    console.log('pomodoroRecord => ', pomodoroRecord);

    if (!user) {
      res.status(401);
      throw new Error('User not found.');
    }

    // // Make sure authenticated user matches goal user
    // if (pomodoroRecord.user.toString() !== user.id) {
    //   res.status(401);
    //   throw new Error('User not authorized.');
    // }

    await Pomodoro.findOneAndUpdate(
      {
        user: req.user._id,
        date: { $gte: new Date(`${req.body.date}T00:00:00.000Z`), $lt: new Date(`${req.body.date}T23:59:00.000Z`) },
      },
      req.body
    );
    const updatedPomodoroRecord = await Pomodoro.find({ user: req.user._id, date: req.body.date });

    console.log('updated pomodoroRecord => ', updatedPomodoroRecord);
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
