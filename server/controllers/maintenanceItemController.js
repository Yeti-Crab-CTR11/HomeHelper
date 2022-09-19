const db = require("../models/database");

const maintenanceItemController = {
  getItemsList: (req, res, next) => {
    const { user_id } = req.params;
    const text =
      "SELECT _id, item_name FROM maintenance_item WHERE user_id = $1";
    const values = [user_id];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceItemsList = response.rows;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to get list of maintenance items, please review input fields",
          },
        });
      });
  },

  addItem: (req, res, next) => {
    const { item_name, user_id } = req.body;
    console.log('body', req.body)
    const text =
      "INSERT INTO maintenance_item (item_name, user_id) VALUES ($1, $2) RETURNING _id";
    const values = [item_name, user_id];
    db.query(text, values)
      .then((response) => {
        res.locals.maintenanceItemId = response.rows[0]._id;
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to add maintenance item, please review input fields",
          },
        });
      });
  },

  deleteItem: (req, res, next) => {
    const { maintenance_item_id } = req.body;
    const text = "DELETE FROM maintenance_item where _id = $1";
    const values = [maintenance_item_id];
    db.query(text, values)
      .then((response) => {
        next();
      })
      .catch((err) => {
        next({
          status: 404,
          message: {
            err: "Error with request to delete item, please review input fields",
          },
        });
      });
  },
};

module.exports = maintenanceItemController;
