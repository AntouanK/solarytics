
const React         = require('react');
const Dispatcher    = require('./Dispatcher.js');
const utils         = require('./utils');
const App           = require('./components/App.jsx');

var todaysDate;


const triggerUpdate = () => {

  let d = new Date();
  let year = utils.addZero(d.getFullYear().toString().slice(-2));
  let month = utils.addZero(d.getMonth() + 1);
  let day = utils.addZero(d.getDate());
  todaysDate = `${year}${month}${day}`;

  let lastYearSameDate =
  ((todaysDate.substr(0,2) | 0) - 1) + todaysDate.substr(2);

  Dispatcher
  .dispatch({
    actionType: 'date-list-update'
  });

  Dispatcher
  .dispatch({
    actionType: 'fetch-total-for-date',
    startDate: lastYearSameDate,
    endDate: todaysDate
  });
};


triggerUpdate();
setInterval(triggerUpdate, 10000);


React.render(
  <App todaysDate={todaysDate} />,
  document.querySelector('#mount')
);
