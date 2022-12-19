import mongoose from 'mongoose';

const timeLongs = new mongoose.Schema({
  startTime: {
    type: [Date],
  },

  endTime: {
    type: [Date],
  },

  totalTime: {
    type: String,
  },
});

const timeLogs = mongoose.model('timelongs', timeLongs);