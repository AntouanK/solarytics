
'use strict';

//--------------------------------------------------------------  imports
const React   = require('react');
const utils   = require('../utils');
const Tile    = require('./Tile.jsx');


//--------------------------------------------------------------  style
const style = {
  flex: '1 0 auto',
  display: 'flex'
};
const labelStyle = {
  flex: '0 0 200px',
  fontSize: '12px'
};
const whStyle = {
  fontSize: '16px',
  color: '#bfd9bf'
};
const barContainerStyle = {
  flex: '1 0 600px'
};


//--------------------------------------------------------------  Component
const DaysWhBars = React.createClass({

  propTypes: {
    label:  React.PropTypes.string.isRequired,
    wh:  React.PropTypes.number.isRequired
  },

  // componentDidMount() {
  //
  // },
  //
  // componentWillUnmount() {
  //   if(this.__interval){
  //     clearInterval(this.__interval);
  //   }
  // },

  render: function() {

    let width = ((this.props.wh * 100) / this.props.max) + '%';
    let barStyle = {
      height: '15px',
      width,
      backgroundColor: '#bfd9bf'
    };

    return (
      <div style={style}>
        <div style={labelStyle}>
          <span style={whStyle}>{this.props.wh} Wh </span>
          <span>( {this.props.label} )</span>
        </div>
        <div style={barContainerStyle}>
          <div style={barStyle}></div>
        </div>
      </div>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = DaysWhBars;
