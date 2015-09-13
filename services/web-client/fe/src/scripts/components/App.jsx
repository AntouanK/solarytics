
import React        from 'react';
import DayDataStore from '../stores/DayData.js';
import Dispatcher   from '../Dispatcher.js';
import {DayList}    from './DayList.jsx';

Dispatcher
.dispatch({
  actionType: 'date-list-update'
});


export const App =
React.createClass({

  getInitialState: function() {
    return {
      dayList: DayDataStore.getAvailableList()
    };
  },

  componentDidMount: function() {
    DayDataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DayDataStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      dayList: DayDataStore.getAvailableList()
    });
  },

  render: function() {
    return (
      <div>
        <DayList list={ this.state.dayList } />
      </div>
    );
  }
});
