
const utils = {};


utils.addZero = (number) => {
  return (number > 9) ? number : ('0' + number);
};


utils.convertFromPvDate = (pvDate) => {
  let newYear   = '20' + pvDate.slice(0, 2);
  let newMonth  = +pvDate.slice(2, 4) - 1;
  let newDay    = +pvDate.slice(4, 6);
  return new Date(newYear, newMonth, newDay);
};


utils.convertToPvDate = (date) => {

  let month = (date.getMonth() + 1) + '';
  if(month.length === 1){
    month = '0' + month;
  }

  let day = date.getDate() + '';
  if(day.length === 1){
    day = '0' + day;
  }

  let year = (date.getUTCFullYear() + '').slice(2,4);

  return year + month + day;
};





module.exports = utils;
