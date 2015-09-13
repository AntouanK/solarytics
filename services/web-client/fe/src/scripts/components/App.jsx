
import React        from 'react';
import DayDataStore from '../stores/DayData.js';
import Dispatcher   from '../Dispatcher.js';
import {DayList}    from './DayList.jsx';
import {DayStats}   from './DayStats.jsx';

Dispatcher
.dispatch({
  actionType: 'date-list-update'
});


const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
};

export const App =
React.createClass({

  getInitialState: function() {
    return {
      dayList: DayDataStore.getAvailableList(),
      activeDate: DayDataStore.getActiveDate()
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
      dayList: DayDataStore.getAvailableList(),
      activeDate: DayDataStore.getActiveDate()
    });
  },

  render: function() {

    let dayStatsComp = '';
    let activeDayObj = DayDataStore.getDay(this.state.activeDate);

    if(activeDayObj !== undefined){
      dayStatsComp = ( <DayStats dayObj={activeDayObj} /> );
    }

    return (
      <div style={style}>
        <DayList list={ this.state.dayList } />
        { dayStatsComp }
      </div>
    );
  }
});
