const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authGuard } = require('../middleware/authMiddleware');

router.get('/', authGuard, getTasks);
router.post('/', authGuard, createTask);
router.put('/:id', authGuard, updateTask);
router.delete('/:id', authGuard, deleteTask);

module.exports = router;
