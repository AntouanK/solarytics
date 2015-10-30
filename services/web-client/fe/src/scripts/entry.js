
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

  Dispatcher
  .dispatch({
    actionType: 'date-list-update'
  });

  Dispatcher
  .dispatch({
    actionType: 'fetch-total-for-date',
    startDate: todaysDate,
    endDate: todaysDate
  });
};


triggerUpdate();
setInterval(triggerUpdate, 60000);


React.render(
  <App today={todaysDate} />,
  document.querySelector('#mount')
);
