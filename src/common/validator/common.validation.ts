// only english uper and lower letter, min three letter, max ten letter
const isValidString = (name:string) => {
  return /^[a-zA-Z]{3,10}$/.test(name);
};

// Minimum eight characters,max sixteen characters at least one uppercase letter, one lowercase letter, one number and one special character:
const validPassword = (password:string) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  return re.test(password);
};

export { isValidString, validPassword };
