const asyncHandler = require('express-async-handler');
const { findById, findByIdAndUpdate } = require('../models/taskModel');

const Task = require('../models/taskModel');
const User = require('../models/userModel');

// GET - retrieve all tasks
// /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  console.log('all tasks => ', tasks);

  res.status(200).json({
    tasks,
  });
});

// POST - create a new task
// /api/tasks
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a task title.');
  }

  const task = await Task.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
  });

  res.status(200).json(task);
});

// PUT - update an existing tasks
// /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found.');
  }

  // Check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  // Make sure authenticated user matches goal user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  console.log('updatedTask => ', updatedTask);
  res.status(200).json(updatedTask);
});

// DELETE - delete an existing task
// /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found.');
  }

  // Check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found.');
  }

  // Make sure authenticated user matches goal user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  await Task.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
