const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const remindersRouter = require('./routes/reminders');
const usersRouter = require('./routes/users');
const maintenanceItemRouter = require('./routes/maintenanceItem');
const scheduleController = require('./controllers/scheduleController');

//LEAVE THIS COMMENTED OUT EXCEPT FOR DURING THE DEMO!!!
// setInterval(scheduleController.getRecords, 6000); 

//parse request body for POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/style.css')));



// app.get('/', (req, res) => res.status(200).sendFile(path.join( __dirname, '../index.html')));
app.use('/api/reminders', remindersRouter);
app.use('/api/users', usersRouter);
app.use('/api/maintenance', maintenanceItemRouter);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// app.get('/', (req, res) => res.status(200).sendFile(path.join( __dirname, '../index.html')));
// app.get( (req, res) => res.redirect('/'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


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
