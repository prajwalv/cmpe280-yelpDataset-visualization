var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/main");

/*
 * GET home page.
 */
router.get("/", ctrlMain.home);

/*
 * GET register page.
 */
router.get("/register", ctrlMain.get_register);

/*
 * POST register page.
 */
router.post("/register", ctrlMain.post_register);

/*
 * Dashboard page
 */
router.post("/dashboard", ctrlMain.dashboard);
router.get("/dashboard", ctrlMain.dashboard);

module.exports = router;
