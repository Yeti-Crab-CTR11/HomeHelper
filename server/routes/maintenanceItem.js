const express = require('express');
const router = express.Router();
const maintenanceItemController = require('../controllers/maintenanceItemController');

router.get('/:user_id', maintenanceItemController.getItemsList,  (req, res) => {
  res.status(200).json(res.locals.maintenanceItemsList);
});

router.post('/add_item', maintenanceItemController.addItem,  (req, res) => {
  res.status(200).json(res.locals.maintenanceItemId);
});

router.delete('/delete_item', maintenanceItemController.deleteItem,  (req, res) => {
  res.status(200).json(res.locals.maintenanceDetailsId);
});

router.put('/update_item_details', maintenanceItemController.updateItemDetails,  (req, res) => {
  res.status(200).json(res.locals.maintenanceDetailsId);
});
module.exports = router;
