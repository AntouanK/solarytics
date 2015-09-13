
const day = require('../day');

module.exports = (req, res) => {

  day.getAvailable()
  .then((list) => {
    res.json({
      status: 'ok',
      content: list
    });
  })
  .catch((err) => {
    res.json({
      status: 'error'
    });
  });
};
