var HashMap = require("hashmap");
var map = new HashMap();
/*
 * GET home page.
 */
module.exports.home = function(request, result) {
  result.render("html/index", { message: "" });
};

/*
 * GET register page.
 */
module.exports.get_register = function(request, result) {
  result.render("html/register", { message: "" });
};

/*
 * POST register page.
 */
module.exports.post_register = function(request, result) {
  var email = request.body.email;
  var password = request.body.password;
  var name = request.body.name;
  if (map.has(email)) {
    result.render("html/register", { message: "Email Id already exists" });
  } else {
    map.set(email, { password: password, name: name });
    result.render("html/index", { message: "" });
  }
};

/*
 * GET dashboard based on the role
 */
module.exports.dashboard = function(request, result) {
  // var email = request.body.email;
  // var password = request.body.password;
  var email = 'prajwal.venkatesh@sjsu.edu';
  var password = 'Admin@123';
  var role = "user1";
  // if (map.has(email) && map.get(email).password === password) {
    if (role == "user") {
      if (email == email && password == password ){
        result.render("html/user-dashboard", { user: "Admin" });
    } else {
      result.render("html/index", { message: "Invalid credentials" });
    } }
    else {
    if (email == email && password == password ){
    result.render("html/business-dashboard", { user: "Admin" });
    // result.render("html/business-dashboard", { user: "Admin" });
  } else {
    result.render("html/index", { message: "Invalid credentials" });
  }}
};

