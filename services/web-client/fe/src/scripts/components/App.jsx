
'use strict';

//--------------------------------------------------------------  imports
const React         = require('react');
const DayDataStore  = require('../stores/DayData.js');
const Dispatcher    = require('../Dispatcher.js');
const Today         = require('./Today.jsx');
const DaysWh        = require('./DaysWh.jsx');

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
    let d = this.props.todaysDate;
    let todaysWhComponent = '';

    if(Number.isInteger(todaysWh)){
      todaysWhComponent = (
        <DaysWh
        wh={todaysWh}
        prefix={'Production for today is '} />);
    }

    let lastYearSameDate = ((d.substr(0,2) | 0) - 1) + d.substr(2);
    let lastYearSameDateWh = this.state.dateTotal.get(lastYearSameDate);
    let lastYearSameDateWhComponent = '';

    if(Number.isInteger(lastYearSameDateWh)){
      lastYearSameDateWhComponent = (
        <DaysWh
        wh={lastYearSameDateWh}
        prefix={`Last year, for the same date (${lastYearSameDate}) `} />);
    }

    return (
      <div style={style}>
        <Today />
        {todaysWhComponent}
        {lastYearSameDateWhComponent}
      </div>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = App;
