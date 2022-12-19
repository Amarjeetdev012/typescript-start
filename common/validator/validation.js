const isValidString = (name) => {
  return /^[a-zA-Z]/.test(name);
};

// get current time and date
// const currTime = () => {
//   const d = new Date();
//    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
//    const nd = new Date(utc + 3600000 * +5.5);
//   const ist = nd.toLocaleString();
//   return d;
// };

export { isValidString };
