
const React           = require('react');
const Dispatcher      = require('../Dispatcher.js');
const SnapshotData    = require('./SnapshotData.jsx');

const style = {
  flex: '1 0 auto'
};


const DayStats =
React.createClass({

  propTypes: {
    dayObj: React.PropTypes.object.isRequired
  },

  render: function() {

    let self    = this;
    let dayObj  = this.props.dayObj;

    if(dayObj.state === 'loading'){
      return (
        <div style={style}>
          <div>
            <span>
              Date: {dateString}
            </span>
            <span>
              State: {dayObj.state}
            </span>
          </div>
        </div>
      );
    }

    let day   = dayObj.date.slice(4, 6);
    let month = dayObj.date.slice(2, 4);
    let year  = dayObj.date.slice(0, 2);

    let dateString =
    (new Date(`${month} ${day} ${year}`))
    .toString()
    .slice(0, 15);

    let aSnapshot = dayObj.snapshots[Object.keys(dayObj.snapshots).slice(0, 1)[0]];

    return (
      <div style={style}>
        <div>
          <span style={{ padding: '0 10px 0 0' }}>
            Date: {dateString}
          </span>
          <span style={{ padding: '0 10px' }}>
            State: {dayObj.state}
          </span>
          <span style={{ padding: '0 10px' }}>
            Last updated: { (new Date(dayObj.lastModified)).toString().slice(0, 15) }
          </span>
        </div>
        <div>
          <table style={{ fontSize: '14px', textAlign: 'center', margin: '10px 0' }}>
            <thead>
              <tr>
                <th key={'time'}>Time</th>
                {
                  aSnapshot.data
                  .map((dataObj, i) => {
                    return (
                      <th key={i}>{dataObj.legend}</th>
                    );
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(dayObj.snapshots)
                .map(key => {
                  return (<SnapshotData key={key} snapshot={dayObj.snapshots[key]} />);
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = DayStats;
