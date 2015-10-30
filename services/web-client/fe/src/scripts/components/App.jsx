
'use strict';

//--------------------------------------------------------------  imports
const React         = require('react');
const DayDataStore  = require('../stores/DayData.js');
const Dispatcher    = require('../Dispatcher.js');
const Today         = require('./Today.jsx');

//--------------------------------------------------------------  style
const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
};


//--------------------------------------------------------------  Component
const App = React.createClass({

  componentDidMount: function() {
    DayDataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DayDataStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log('on change');
    console.log(DayDataStore.getState());
  },

  render: function() {

    return (
      <div style={style}>
        <Today />
      </div>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = App;
