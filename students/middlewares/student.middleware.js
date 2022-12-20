import { isValidString } from '../../common/validator/common.validation';
import { uniqueEmail, uniqueUserName } from '../models/student.model';

const validBody = async (req, res, next) => {
  const data = req.body;
  const { name, email, userName, password } = data;
  if (!isValidString(name)) {
    return res
      .status(400)
      .send({ status: false, message: 'please provide valid name' });
  }
  
  const emailValid = await uniqueEmail(email);
  if (emailValid.length > 0) {
    return res.status(400).send({
      status: false,
      message:
        'please provide different email this email is already registered',
    });
  }
  const userNameValid = await uniqueUserName(userName);
  if (userNameValid.length > 0) {
    return res.status(400).send({
      status: false,
      message:
        'please provide different userName this userName is already registered',
    });
  }
  next();
};

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function newTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  hours = hours % 24;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}

function filterName(checkDate) {
  const data = checkDate.map((element) => {
    return element.name;
  });
  return data;
}

export { validBody, newTime, filterName };
