
const React         = require('react');
const DayDataStore  = require('../stores/DayData.js');
const Dispatcher    = require('../Dispatcher.js');
const DayList       = require('./DayList.jsx');
const Today         = require('./Today.jsx');


const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
};


const App =
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

    // this.setState({
    //   dayList: DayDataStore.getAvailableList(),
    //   activeDate: DayDataStore.getActiveDate()
    // });
  },

  render: function() {

    let dayStatsComp = '';
    let activeDayObj = DayDataStore.getDay(this.state.activeDate);

    if(activeDayObj !== undefined){
      dayStatsComp = ( <DayStats dayObj={activeDayObj} /> );
    }

    return (
      <div style={style}>
        <Today />
      </div>
    );
  }
});

module.exports = App;

/*

<DayList list={ this.state.dayList } />
{ dayStatsComp }
*/
