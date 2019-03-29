var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/main");
var modelMain = require("../models/main");

/*
 * GET home page.
 */
router.get("/", ctrlMain.home);

/*
 * GET Login page
 */
router.get("/login", ctrlMain.get_login);

/*
 * POST Login page
 */
router.post("/login", ctrlMain.post_login);

/*
 * GET Logout
 */
router.get("/logout", ctrlMain.logout);

/*
 * GET register page.
 */
router.get("/register", ctrlMain.get_register);

/*
 * POST register page.
 */
router.post("/register", ctrlMain.post_register);

/*
 * GET user dashboard page.
 */
router.get("/user-dashboard", [ctrlMain.loggedIn, ctrlMain.get_user_dashboard]);

/*
 * POST user dashboard page.
 */
router.post("/user-dashboard", [
  ctrlMain.loggedIn,
  ctrlMain.post_user_dashboard
]);

/*
 * GET business dashboard page.
 */
router.get("/business-dashboard", [
  ctrlMain.loggedIn,
  ctrlMain.get_business_dashboard
]);

/*
 * POST business dashboard page.
 */
router.post("/business-dashboard", [
  ctrlMain.loggedIn,
  ctrlMain.post_business_dashboard
]);

/*
 * GET admin dashboard page.
 */
router.get("/admin-dashboard", [
  ctrlMain.loggedIn,
  modelMain.get_admin_dashboard
]);

/*
 * GET profile page.
 */
router.get("/profile", [ctrlMain.loggedIn, ctrlMain.get_profile]);

router.get("/graphs", [ctrlMain.loggedIn, ctrlMain.get_graphs]);

module.exports = router;
