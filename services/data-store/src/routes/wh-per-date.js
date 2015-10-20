
const day = require('../day');

const getRangeList = (start, end) => {

  let startYear   = '20' + start.slice(0, 2);
  let startMonth  = +start.slice(2, 4) - 1;
  let startDay    = +start.slice(4, 6);
  let startDate   = new Date(startYear, startMonth, startDay);

  let endYear     = '20' + end.slice(0, 2);
  let endMonth    = +end.slice(2, 4) - 1;
  let endDay      = +end.slice(4, 6);
  let endDate     = new Date(endYear, endMonth, endDay);

  let howManyDaysBetween = ((endDate - startDate) / (1000 * 60 * 60 * 24)) | 0;
  let dateRange = [];

  for(let i = 0; i <= howManyDaysBetween; i += 1){

    let newDay = startDate.getDate() + i;
    let newDate = new Date(startDate.getUTCFullYear(), startDate.getMonth(), newDay);
    dateRange.push(newDate);
  }

  if(startDate.getTime() > endDate.getTime()){
    throw new Error('start date must be older than end date');
  }

  // normalise to solar dates
  dateRange =
  dateRange
  .map(date => {
    //  month starts from zero (!)
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
  });

  return dateRange;
};



module.exports = (req, res) => {

  let startDate = req.params.startdate;
  let endDate   = req.params.enddate;
  let range;

  if(startDate === endDate){
    range = [startDate];
  }
  else {
    range = getRangeList(startDate, endDate);
  }

  Promise.all(range.map(day.getWh))
  .then(responses => {
    res.json({
      status: 'ok',
      content: responses
    });
  })
  .catch((err) => {

    res.json({
      status: 'error',
      error: {
        message: err.message
      }
    });
  });

};
