import mongoose from 'mongoose';

const timeLogsSchema = new mongoose.Schema({
  name: {
    required: true,
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

const createEntry = (name, time) => {
  const data = {};
  data.name = name;
  data.entryTime = time;
  const timeLog = new TimeLog(data);
  return timeLog.save();
};

const updateExit = async (id, time) => {
  const result = await TimeLog.findByIdAndUpdate({_id:id},{exitTime:time})
  console.log(result)
  return result;
};

const findName = async (name) => {
  const data = await (await TimeLog.find({ name })).reverse()
  return data[0];
};

const findAll = async (name) => {
    const data = await TimeLog.find({name})
    return data
}
export { createEntry, updateExit, findName, findAll };
