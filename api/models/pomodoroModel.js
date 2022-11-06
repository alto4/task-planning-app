const mongoose = require('mongoose');

const pomodoroSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
    count: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pomdoro', pomodoroSchema);
