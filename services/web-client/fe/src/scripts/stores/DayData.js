
import Dispatcher   from '../Dispatcher.js';
import request      from 'request';
import assign       from 'object-assign';
const EventEmitter = require('events').EventEmitter;

var availableDays = [];

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
  }
});




const updateList = () => {

  return new Promise(function(res, rej){

    request
    .get(
      {
        url: 'http://solarytics:10000/day-list',
        json: true
      },
      (err, httpRes, body) => {

        if(err){
          throw new Error(err);
        }

        if(body.status !== 'ok'){
          throw new Error(body.error.message);
        }

        availableDays = body.content;
        DayData.emitChange();
      }
    );
  });
};



Dispatcher.register(function(payload) {

  switch (payload.actionType) {

    case 'date-list-update':
      updateList();
      DayData.emitChange();
      break;

    default:
  }
});


module.exports = DayData;
