
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
        url: `https://${window.location.hostname}/api/wh/per/date/${startDate}/${endDate}`,
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          throw new Error(err);
        }

        if(body.status !== 'ok'){
          reject(new Error(body.error.message));
        }

        let datesSet = new Set();

        body.content
        .forEach(result => {
          if(Number.isInteger(result.value)){
            STATE.dateTotal.set(result.date, result.value);

            datesSet.add(result.date);
          }
        });

        resolve({
          status: 'ok',
          datesSet
        });
      }
    );
  });
};


const updateList = () => {

  return new Promise((resolve, reject) => {

    request
    .get(
      {
        url: `https://${window.location.hostname}/api/day-list`,
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          return reject(err);
        }

        if(body.status !== 'ok'){
          return reject(body.error.message);
        }

        STATE.availableDays = body.content.sort().reverse();
        resolve();
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
      updateList()
      .then(() => {
        DayData.emitChange();
      })
      .catch((err) => {
        console.log(err);
      });

      break;

    case 'fetch-total-for-date':
      getWhPerDate(payload.startDate, payload.endDate)
      .then(() => {
        DayData.emitChange();
      })
      .catch((err) => {
        console.log(err);
      });
      break;

    default:
      break;
  }
});



module.exports = DayData;
