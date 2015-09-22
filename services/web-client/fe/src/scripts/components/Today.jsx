
const React = require('react');
const Tile  = require('./Tile.jsx');
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

const style = {};
style.todayStats = {
  flex: '1 0 300px'
};
style.dayName = {
  fontSize: '44px',
  textTransform: 'capitalize'
};
style.day = {
  fontSize: '40px'
};
style.time = {
  fontSize: '32px'
};


const Today =
React.createClass({

  _getDate() {

      let d = new Date();
      let seconds = d.getSeconds();

      return {
        dayName: dayNames[d.getDay()],
        day: d.getDate(),
        monthName: monthNames[d.getMonth()],
        year: d.getUTCFullYear(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: (seconds < 10) ? ('0' + seconds) : seconds
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
    // let dayObj  = this.props.dayObj;

    return (
      <Tile style={style.todayStats}>
        <div>
          <div>
            <span style={style.dayName}>{date.dayName}</span>
          </div>
          <div>
            <span style={style.day}>{date.day}</span>
            <span>  </span>
            <span>{date.monthName}</span>
            <span>  </span>
            <span>{date.year}</span>
          </div>
          <div style={style.time}>
            {date.hours}:{date.minutes}:{date.seconds}
          </div>
        </div>
      </Tile>
    );
  }
});

module.exports = Today;
