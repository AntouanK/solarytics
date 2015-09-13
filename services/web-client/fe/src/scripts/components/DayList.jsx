
import React from 'react';


export const DayList =
React.createClass({

  render: function() {

    let getLine = (date) => {
      return (
        <li key={date}>
          {date}
        </li>
      );
    };

    return (
      <div>
        <ul>
          { this.props.list.map(getLine) }
        </ul>
      </div>
    );
  }
});
