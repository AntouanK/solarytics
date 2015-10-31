
'use strict';

//--------------------------------------------------------------  imports
const React   = require('react');
const utils   = require('../utils');
const Tile    = require('./Tile.jsx');
const WhBar   = require('./WhBar.jsx');

//--------------------------------------------------------------  style
const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '800px'
};


//--------------------------------------------------------------  Component
const DaysWhBars = React.createClass({

  propTypes: {
    days:  React.PropTypes.array.isRequired,
    max:  React.PropTypes.number.isRequired
  },

  render: function() {

    let self = this;

    return (
      <Tile>
        <div style={style}>
          {
            this.props.days
            .map(dayObj => {

              if(!dayObj || !(dayObj.wh > -1)){
                return '';
              }

              return (
                <WhBar
                label={dayObj.label}
                wh={dayObj.wh}
                max={this.props.max} />
              );
            })
          }
        </div>
      </Tile>
    );
  }
});

//--------------------------------------------------------------  export
module.exports = DaysWhBars;
