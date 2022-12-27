"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPassword = exports.isValidString = void 0;
// only english uper and lower letter, min three letter, max ten letter
const isValidString = (name) => {
    return /^[a-zA-Z]{3,10}$/.test(name);
};
exports.isValidString = isValidString;
// Minimum eight characters,max sixteen characters at least one uppercase letter, one lowercase letter, one number and one special character:
const validPassword = (password) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(password);
};
exports.validPassword = validPassword;
