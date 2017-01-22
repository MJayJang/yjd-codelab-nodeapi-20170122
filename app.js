const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', require('./api/user'));

app.listen(3000, () => {
  console.log(`Run at http://localhost:3000`)
  models.sequelize.sync({force: true})
      .then(() => {
        console.log('Database sync');
      });
});

module.exports = app;
