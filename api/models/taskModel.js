const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    completed: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: [true, 'Please include a task title.'],
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    estimatedPomodoros: {
      type: Number,
      required: false,
      default: 0,
    },
    completedPomodoros: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
