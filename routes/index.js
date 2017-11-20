var express = require('express');
var router = express.Router();

//LOAD the various controllers
var ControllerDatabase = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection

//MAY HAVE OTHER CODE in index.js


//CODE to route /getAllRoutes to appropriate  Controller function
//**************************************************************************
//***** mongodb get all of the Routes in Routes collection w
//      and Render information iwith an ejs view
router.post('/storeData', ControllerDatabase.storeData);

module.exports = router;