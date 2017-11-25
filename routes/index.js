var express = require('express');
var router = express.Router();

// Loading controller for database
var ControllerDatabase = require('../controllers/database');

// When /storeData is called call this function
router.post('/storeData', ControllerDatabase.storeData);

module.exports = router;