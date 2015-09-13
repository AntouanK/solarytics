
import Dispatcher   from '../Dispatcher.js';
import request      from 'request';
import assign       from 'object-assign';
const EventEmitter = require('events').EventEmitter;

var availableDays = [];
var _days = new Map();


const updateList = () => {

  return new Promise(function(res, rej){

    request
    .get(
      {
        url: `hthttp://${window.location.hostname}.location.hostname}:11000/day-list`,
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          throw new Error(err);
        }

        if(body.status !== 'ok'){
          throw new Error(body.error.message);
        }

        availableDays = body.content.sort();
        DayData.emitChange();
      }
    );
  });
};

const setActiveDate = (date) => {

  //  set the active date
  _days.set('_active', date);
};


const getStatsForDate = (date) => {

  return new Promise(function(res, rej){

    //  set the loading state
    if(!_days.has(date)){
      _days.set(date, { state: 'loading' });
    }
    else {
      let oldDayObj = _days.get(date);
      oldDayObj.state = 'loading';
      _days.set(date, oldDayObj);
    }

    request
    .get(
      {
        url: `http://${window.location.hostname}:11000/day/${date}`,
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          throw new Error(err);
        }

        if(body.status !== 'ok'){
          throw new Error(body.error.message);
        }

        let newDayObj = body.content;
        newDayObj.state = 'upToDate';
        newDayObj.lastModified = Date.now();

        _days.set(date, newDayObj);
        DayData.emitChange();
      }
    );
  });
};



const DayData = assign({}, EventEmitter.prototype, {

  getAvailableList: () => {
    return availableDays.slice();
  },

  getDay: (date) => {
    return DayList[date];
},

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getActiveDate: () => {
    return _days.get('_active');
  },

  getDay: (date) => {
    return _days.get(date);
  }
});



Dispatcher.register(function(payload) {

  switch (payload.actionType) {

    case 'date-list-update':
      updateList();
      DayData.emitChange();
      break;

    case 'set-active-date':
      setActiveDate(payload.date);
      getStatsForDate(payload.date);
      DayData.emitChange();
      break;

    default:
  }
});



module.exports = DayData;
