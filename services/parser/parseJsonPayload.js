
'use strict';

const wantedKeys  = new Set([
  'Time',     // the time
  'Addresse', //  which "inverter" or something
  'P_DC_WR',
  'P_AC_WR',
  'E_D_WR',
  'U_DC_1',
  'I_DC_1',
  'P_DC_1',
  'U_DC_2',
  'I_DC_2',
  'P_DC_2'
]);


const parseJSONPayload = (jsonPayload, wantedKeys) => {

  let columns = new Set();

  jsonPayload
  .legends
  .forEach((key, i) => {
    if(wantedKeys.has(key)){
      columns.add(i);
    }
  });


  let snapshots =
  jsonPayload
  .lines
  .map(ln => {
    let line = [];
    let time;

    for(let index of columns){

      let legend = jsonPayload.legends[index];
      if(legend === 'Time'){
        time = ln[index];
      }
      else {
        let unit = jsonPayload.units[index];

        line.push({
          legend,
          unit,
          value:  ln[index]
        });
      }

    }

    return {
      time: ln[0],
      data: line
    };
  })

  return {
    date: jsonPayload.date,
    snapshots
  }
};

module.exports = parseJSONPayload;
