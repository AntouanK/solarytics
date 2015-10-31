
'use strict';

//--------------------------------------------------------------  imports
const React         = require('react');
const Utils         = require('../utils');
const DayDataStore  = require('../stores/DayData.js');
const Dispatcher    = require('../Dispatcher.js');
const Today         = require('./Today.jsx');
const DaysWh        = require('./DaysWh.jsx');
const DaysWhBars    = require('./DaysWhBars.jsx');

//--------------------------------------------------------------  style
const style = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
};


//--------------------------------------------------------------  Component
const App = React.createClass({

  propTypes: {
    todaysDate:  React.PropTypes.string.isRequired
  },

  getInitialState() {
    return DayDataStore.getState();
  },

  componentDidMount: function() {
    DayDataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DayDataStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(DayDataStore.getState());
  },

  render: function() {

    let todaysWh = this.state.dateTotal.get(this.props.todaysDate);
    let todaysDate = this.props.todaysDate;
    let todaysWhComponent = '';

    if(Number.isInteger(todaysWh)){
      todaysWhComponent = (
        <DaysWh
        wh={todaysWh}
        prefix={'Production for today is '} />);
    }

    let lastYearSameDate =
    ((todaysDate.substr(0,2) | 0) - 1) + todaysDate.substr(2);
    let lastYearSameDateWh = this.state.dateTotal.get(lastYearSameDate);
    let lastYearSameDateWhComponent = '';

    if(Number.isInteger(lastYearSameDateWh)){
      lastYearSameDateWhComponent = (
        <DaysWh
        wh={lastYearSameDateWh}
        prefix={`Last year, for the same date (${lastYearSameDate}) `} />);
    }


    let max = 0;
    let xDaysAgo = [1,2,3,4,5,6,7,8,9,10]
    .map(x => {

      let date = new Date(
        Utils.convertFromPvDate(todaysDate) - (x * 24 * 60 * 60 * 1000)
      );
      let pvDate = Utils.convertToPvDate(date);
      let wh = this.state.dateTotal.get(pvDate);

      if(wh > max){
        max = wh;
      }

      return {
        label: date.toString().substr(0, 15),
        wh
      };
    });


    return (
      <div style={style}>
        <Today />
        {todaysWhComponent}
        {lastYearSameDateWhComponent}
        <DaysWhBars days={xDaysAgo} max={max} />
      </div>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = App;
