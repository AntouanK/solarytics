
import Dispatcher   from '../Dispatcher.js';
import request      from 'request';
import assign       from 'object-assign';
const EventEmitter = require('events').EventEmitter;

const STATE = {
  availableDays: [],
  dateTotal: new Map(),
  todaysDate: ''
};



const getWhPerDate = (startDate, endDate) => {

  return new Promise((resolve, reject) => {

    if(typeof endDate !== 'string'){
      endDate = startDate;
    }

    if(typeof startDate !== 'string'){
      reject(new Error('start date must be a string'));
    }

    request
    .get(
      {
        url: `http://${window.location.hostname}:11000/wh/per/date/${startDate}/${endDate}`,
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          throw new Error(err);
        }

        if(body.status !== 'ok'){
          reject(new Error(body.error.message));
        }

        body.content
        .forEach(result => {
          if(Number.isInteger(result.value)){
            STATE.dateTotal.set(result.date, result.value);
          }
        });

        resolve('ok');
      }
    );
  });
};


const updateList = () => {

  return new Promise(function(res, rej){

    request
    .get(
      {
        url: `http://${window.location.hostname}:11000/day-list`,
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          throw new Error(err);
        }

        if(body.status !== 'ok'){
          throw new Error(body.error.message);
        }

        STATE.availableDays = body.content.sort().reverse();
        DayData.emitChange();
      }
    );
  });
};


const DayData = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getState: () => {
    return STATE;
  }
});


Dispatcher.register(function(payload) {

  switch (payload.actionType) {

    case 'date-list-update':
      updateList();
      DayData.emitChange();
      break;

    case 'fetch-total-for-date':
      getWhPerDate(payload.startDate, payload.endDate);
      DayData.emitChange();
      break;

    default:
      break;
  }
});



module.exports = DayData;
