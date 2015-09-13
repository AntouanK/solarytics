
'use strict';


module.exports = function(contents){

  if(typeof contents !== 'string'){
    throw new Error('contents must be string');
  }

  var fileObj       = { lines: [] };
  var lines         = contents.split('\n');
  let messungState  = false;
  let StartState    = false;

  lines
  .forEach(function(line){

    line = line.replace('\r', '');

    if( line.match(/^Datum=/) ){
      fileObj.date = line.replace(/\D/g, '');
      return true;
    }

    if( line.match(/^\[messung\]/) ){
      messungState = 0;
      return true;
    }

    if(messungState === 0){
      fileObj.legends = line.split(';');
      fileObj.legends[0] = 'Time';
      messungState = 1;
      return true;
    }
    else if(messungState === 1){
      fileObj.units = line.split(';');
      messungState = 2;
      return true;
    }

    if( line.match(/^\[Start\]/) ){
      StartState = true;
      return true;
    }


    if(StartState === true){

      //  skip if Info;Time
      if(line.match(/^Info;Time/)){
        console.log('skipping "Info;Time"');
        return true;
      }
      let sections  = line.split(';');
      if(sections.length > 1){
        fileObj.lines.push(sections);
      }

      return true;
    }

  });

  return fileObj;
};
