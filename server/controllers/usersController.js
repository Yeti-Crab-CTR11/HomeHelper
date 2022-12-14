const db = require('../models/database');

const userController = {
  createNewUser: (req, res, next) => {
    const { user_name, password, email, phone } = req.body;
    const text =
      'INSERT INTO user_account (user_name, password, email, phone) VALUES ($1, $2, $3, $4) RETURNING _id';
    const values = [user_name, password, email, phone];
    console.log(req.body);
    db.query(text, values)
      .then((response) => {
        res.locals.userId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to make new user, please review input fields',
          }, 
        });
      });
  },

  verifyUser: (req, res, next) => {
    const { user_name, password } = req.body;
    const text = 'SELECT password, _id FROM user_account WHERE user_name = $1';
    const values = [user_name];
    db.query(text, values)
      .then((response) => {
        //no encrypting currently, just checks for a match of username and password, look at later if time allows
        response.rows.forEach((user) => {
          if (password === user.password) {
            res.locals.userId = user._id;
            console.log('success!');
          }
        });
        if (!res.locals.userId) {
          console.log('Username or password are incorrect!');
          res.locals.id(null); //if password/username doesn't work, set ID to null
        }
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to login, please review input fields',
          },
        });
      });
  },

  deleteUser: (req, res, next) => {
    const { user_id } = req.body;
    const text = 'DELETE FROM user_account where _id = $1';
    const values = [user_id];
    db.query(text, values)
      .then((response) => {
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: 'Error with request to delete child, please review input fields',
          },
        });
      });
  },
};

module.exports = userController;
