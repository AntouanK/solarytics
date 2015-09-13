
import React        from 'react';
import Dispatcher   from '../Dispatcher.js';

const style = {
  flex: '1 0 auto'
};


export const DayStats =
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

        </div>
      </div>
    );
  }
});
