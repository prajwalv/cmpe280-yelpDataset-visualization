var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

/*
 * GET home page.
 */
router.get('/', ctrlMain.home);

/*
 * GET register page.
 */
router.get('/register', ctrlMain.register);

module.exports = router;