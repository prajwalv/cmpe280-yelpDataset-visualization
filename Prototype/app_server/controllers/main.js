var HashMap = require("hashmap");
var map = new HashMap();
/*
 * GET home page.
 */
module.exports.home = function(request, result) {
  result.render("html/index", {});
};

/*
 * GET register page.
 */
module.exports.get_register = function(request, result) {
  result.render("html/register", {});
};

/*
 * POST register page.
 */
module.exports.post_register = function(request, result) {
  var email = request.body.email;
  var password = request.body.password;
  var name = request.body.name;
  if (map.has(email)) {
    result.render("html/register", { error: "Email Id already exists" });
  } else {
    map.set(email, { password: password, name: name });
    result.render("html/index", {});
  }
};

/*
 * GET dashboard
 */
module.exports.dashboard = function(request, result) {
  var email = request.body.email;
  var password = request.body.password;
  if (map.has(email) && map.get(email).password === password) {
    result.render("html/dashboard", { user: map.get(email).name });
  } else {
    result.render("html/index", { message: "Invalid credentials" });
  }
};
