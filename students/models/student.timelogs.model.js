import mongoose from 'mongoose';

const timeLogsSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  entryTime: {
    type: Date,
  },

  exitTime: {
    type: Date,
  },

  totalTime: {
    type: String,
  },
});

const TimeLog = mongoose.model('timelogs', timeLogsSchema);

const createEntry = async (name, time) => {
  const data = {};
  data.name = name;
  data.entryTime = time;
  const timeLog = new TimeLog(data);
  return timeLog.save();
};

const checkEntry = async (name) => {
  const checkExit = await (await TimeLog.find({ name })).reverse();
  return checkExit;
};


const checkExit = async (name) => {
  const checkExit = await (await TimeLog.find({ name })).reverse();
  return checkExit;
};

const updateExit = async (id, time) => {
  const result = await TimeLog.findByIdAndUpdate(
    { _id: id },
    { exitTime: time },
    {
      new: true,
    }
  );
  return result;
};

const findName = async (name) => {
  const data = await (await TimeLog.find({ name })).reverse();
  return data[0];
};

const find = async (name) => {
  const data = await TimeLog.find({ name: name });
  //   const data = await TimeLog.find();
  return data;
};

const findAllData = async () => {
  const data = await TimeLog.find();
  return data;
};

const findDate = async (entry, exit) => {
  const data = await TimeLog.find({
    entryTime: {
      $gte: new Date(entry),
    },
    exitTime: { $lte: new Date(exit) },
  });
  return data;
};

const findStudentName = async (name) => {
  const data = await TimeLog.find({ name });
  return data;
};

export {
  createEntry,
  updateExit,
  findName,
  find,
  checkEntry,
  findAllData,
  findDate,
  findStudentName,
  checkExit,
};
