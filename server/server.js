const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const remindersRouter = require('./routes/reminders');
const usersRouter = require('./routes/users');
const maintenanceItemRouter = require('./routes/maintenanceItem');

//parse request body for POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router for handling TWILIO API
app.use('/api/reminders', remindersRouter);

//router for handling adding newUser, deleting user, and verifying user
app.use('/api/users', usersRouter);

//router for handling retrieving all maintenance items for a user, adding new maintenance item, deleting maintenance item, and updating maintenance items
app.use('/api/maintenance', maintenanceItemRouter);

//catch all sends everything else to our index.html (entry point to our react app)
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
