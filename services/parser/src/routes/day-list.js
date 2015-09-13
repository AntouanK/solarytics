
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

    console.log(err.message);
    console.log(err.stack);

    res.json({
      status: 'error',
      error: {
        message: err.message
      }
    });
  });
};
