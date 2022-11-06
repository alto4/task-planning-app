const express = require('express');
const router = express.Router();
const { getPomodoros, createPomodoros, updatePomodoros } = require('../controllers/pomodoroController');
const { authGuard } = require('../middleware/authMiddleware');

router.get('/', authGuard, getPomodoros);
router.post('/', authGuard, createPomodoros);
router.put('/', authGuard, updatePomodoros);

module.exports = router;
