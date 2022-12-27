import mongoose, { Document } from 'mongoose';

export interface ITimelog  {
  name: string,
  entryTime: Date,
  exitTime: Date,
  totalTime: string,
}

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

const createEntry = async (name: string, entryTime: Date) => {
  const timeLog = new TimeLog({ name, entryTime });
  return timeLog.save();
};

// Promise<Document<ITime>>
const checkEntry = async (name: string) => {
  const checkExit = await (await TimeLog.find({ name })).reverse();
  return checkExit;
};

const checkExit = async (name: string) => {
  const checkExit = await (await TimeLog.find({ name })).reverse();
  return checkExit;
};

const updateExit = async (id: string, time: Date) => {
  const result = await TimeLog.findByIdAndUpdate(
    { _id: id },
    { exitTime: time },
    {
      new: true,
    }
  );
  return result;
};

const findName = async (name: string) => {
  const data = await (await TimeLog.find({ name })).reverse();
  return data[0];
};

const find = async (name: string) => {
  const data = await TimeLog.find({ name: name });
  //   const data = await TimeLog.find();
  return data;
};

const findAllData = async () => {
  const data = await TimeLog.find();
  return data;
};

const findDate = async (entry: string, exit: string) => {
  const data = await TimeLog.find({
    entryTime: {
      $gte: new Date(entry),
    },
    exitTime: { $lte: new Date(exit) },
  });
  return data;
};

// Promise<Document<ITime>>
const findStudentName = async (name: string) => {
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
