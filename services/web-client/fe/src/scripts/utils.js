
const utils = {};


utils.addZero = (number) => {
  return (number > 9) ? number : ('0' + number);
};


module.exports = utils;
