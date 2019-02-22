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
router.post("/login", ctrlMain.post_login);

// router.get("/user-dashboard", [
//   ctrlMain.loggedIn,
//   ctrlMain.user_dashboard,
//   ctrlMain.login
// ]);

module.exports = router;
