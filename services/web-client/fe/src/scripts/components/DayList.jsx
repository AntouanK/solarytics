
const React        = require('react');
const Dispatcher   = require('../Dispatcher.js');

const style = {
  flex: '0 0 200px'
};


const DayList =
React.createClass({

  onSelectDate: (date) => {

    Dispatcher
    .dispatch({
      actionType: 'set-active-date',
      date
    });
  },

  render: function() {

    let self = this;

    let getLine = (date) => {

      let day = date.slice(4, 6);
      let month = date.slice(2, 4);
      let year = date.slice(0, 2);

      let dateString =
      (new Date(`${month} ${day} ${year}`))
      .toString()
      .slice(4, 15);

      return (
        <li
        key={date}
        onClick={self.onSelectDate.bind(null, date)}
        style={{
          listStyleType: 'none',
          userSelect: 'none',
          cursor: 'pointer'
        }}>
          {dateString}
        </li>
      );
    };

    let totalDays = this.props.list.length;

    return (
      <div style={style}>
        <div>
          {`${totalDays} days are available`}
        </div>
        <ul style={{ padding: '0' }}>
          { this.props.list.map(getLine) }
        </ul>
      </div>
    );
  }
});

module.exports = DayList;
