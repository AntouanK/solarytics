
const React   = require('react');
const assign  = require('object-assign');

const style = {
  backgroundColor: '#616161',
  padding: '20px',
  margin: '15px'
};


const Tile =
React.createClass({

  render: function() {

    let mergedStyle = assign(style, this.props.style);

    return (
      <div style={mergedStyle}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Tile;
