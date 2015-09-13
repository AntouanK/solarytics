
import React from 'react';

const style = {
  flex: '0 0 200px'
};


export const SnapshotData =
React.createClass({

  propTypes: {
    snapshot: React.PropTypes.object.isRequired
  },

  render: function() {

    let self      = this;
    let snapshot  = this.props.snapshot;

    return (
      <tr>
        <td key={'time'}>{snapshot.time}</td>
        {
          snapshot.data
          .map((dataObj, i) => {
            return (<td key={i}>{dataObj.value}{dataObj.unit} </td>);
          })
        }
      </tr>
    );
  }
});
