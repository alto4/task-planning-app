const asyncHandler = require('express-async-handler');
const { findById, findByIdAndUpdate } = require('../models/taskModel');

const Task = require('../models/taskModel');

// GET - retrieve all tasks
// /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
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

  console.log('req.body => ', req.body.title);
  console.log('id => ', req.params.id);

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

  await Task.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
