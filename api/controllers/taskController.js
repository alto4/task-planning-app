const asyncHandler = require('express-async-handler');

// GET - retrieve all tasks
// /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: 'Get all tasks.',
  });
});

// POST - create a new task
// /api/tasks
const createTask = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a task title.');
  }
  res.status(200).json({
    message: 'Create a task.',
  });
});

// PUT - update an existing tasks
// /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update task details with id ${req.params.id}.`,
  });
});

// DELETE - delete an existing task
// /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete task with id ${req.params.id}.`,
  });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
