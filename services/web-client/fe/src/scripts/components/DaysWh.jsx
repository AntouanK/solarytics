
'use strict';

//--------------------------------------------------------------  imports
const React   = require('react');
const utils   = require('../utils');
const Tile    = require('./Tile.jsx');


//--------------------------------------------------------------  style
const style = {};
style.styleWhNumber = {
  fontSize: '30px',
  color: '#aed4ab'
};

//--------------------------------------------------------------  Component
const DaysWh = React.createClass({

  propTypes: {
    wh:  React.PropTypes.number.isRequired,
    prefix: React.PropTypes.string.isRequired
  },

  step: 111,

  componentDidMount() {

    this.__interval =
    setInterval(() => {

      let newWh = this.state.wh + this.step;

      if(newWh >= this.props.wh){

        // set the target Wh
        this.setState({
          wh: this.props.wh
        });

        //  delete the interval and exit
        clearInterval(this.__interval);
        delete this.__interval;
        return true;
      }


      this.setState({
        wh: this.state.wh + this.step
      });

    }, 10);
  },

  componentWillUnmount() {
    if(this.__interval){
      clearInterval(this.__interval);
    }
  },

  getInitialState() {
    return { wh: 0 };
  },

  render: function() {

    let self  = this;

    return (
      <Tile>
        <div>
          <span>{self.props.prefix}</span>
          <span style={style.styleWhNumber}>
            {self.state.wh}
          </span> Wh
        </div>
      </Tile>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = DaysWh;
