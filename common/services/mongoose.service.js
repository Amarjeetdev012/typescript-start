import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDatabase = () => {
  console.log('mongodb is connecting');
  mongoose
    .connect(
      'mongodb+srv://amarjeet:uwStVsg8DWsD2PZz@cluster0.q5wqi3f.mongodb.net/test',
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log(`mongodb is connected`);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
};

export default connectDatabase;
