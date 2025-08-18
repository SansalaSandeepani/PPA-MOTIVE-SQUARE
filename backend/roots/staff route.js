const express = require('express');
const router = express.Router();

const {  saveStaff,
    getAllStaff,
    updateStaff,  
    deleteStaff,
    getStaffById } = require('../Controller/Staff-Controller');

// router.post('/', savestaff);
router.post('/', async (req, res, next) => {
  try {
    await saveStaff(req, res);
  } catch (error) {
    next(error);
  }
});
router.get('/get', getAllStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.get('/:id', getStaffById);

module.exports = router;
