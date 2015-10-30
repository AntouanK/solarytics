
'use strict';

//--------------------------------------------------------------  imports
const React   = require('react');
const utils   = require('../utils');
const Tile    = require('./Tile.jsx');

const dayNames = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];
const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

//--------------------------------------------------------------  style
const style = {};
style.todayStats = {
  flex: '1 0 300px'
};
style.dayText = {
  fontSize: '30px',
  textTransform: 'capitalize'
};
style.time = {
  fontSize: '40px'
};


//--------------------------------------------------------------  Component
const Today = React.createClass({

  _getDate() {

      let d = new Date();

      return {
        dayName: dayNames[d.getDay()],
        day: d.getDate(),
        monthName: monthNames[d.getMonth()],
        year: d.getUTCFullYear(),
        hours: utils.addZero(d.getHours()),
        minutes: utils.addZero(d.getMinutes()),
        seconds: utils.addZero(d.getSeconds())
      };
  },

  componentDidMount() {
    this.__interval =
    setInterval(() => {
      this.setState({ date: this._getDate() });
    }, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.__interval);
  },

  getInitialState() {
    return { date: this._getDate() };
  },

  render: function() {

    let self  = this;
    let date  = self.state.date;

    return (
      <Tile style={style.todayStats}>
        <div>
          <div style={style.dayText}>
            <span>{date.dayName} {date.day} {date.monthName} {date.year}</span>
          </div>
          <div style={style.time}>
            {date.hours}:{date.minutes}:{date.seconds}
          </div>
        </div>
      </Tile>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = Today;
