var HashMap = require("hashmap");
var map = new HashMap();
var profileMap = new Map(); 
/*
 * GET home page.
 */
module.exports.home = function(request, result) {
  if (request.session.user) {
    var role = map.get(request.session.user).role;
    if (role == "user") {
      result.redirect("/user-dashboard");
    } else {
      result.redirect("/business-dashboard");
    }
  } else {
    request.session.error = "";
    result.redirect("/login");
  }
};

module.exports.get_login = function(request, result) {
  result.render("index", { message: request.session.error });
};

/*
 * Verify if the user is loggedIn
 */
module.exports.loggedIn = function(request, result, next) {
  if (request.session.user) {
    // Proceed if the user is logged in.
    console.log("Logged in: ");
    console.log(request.session.user);
    next();
  } else {
    request.session.error = "You must first log in.";
    result.redirect("/login");
  }
};

/*
 * POST login
 */
module.exports.post_login = function(request, result) {
  var email = request.body.email;
  var password = request.body.password;
  if (map.has(email) && map.get(email).password === password) {
    var role = map.get(email).role;
    if (role == "user") {
      request.session.user = email;
      result.redirect("/user-dashboard");
    } else {
      request.session.user = email;
      result.redirect("/business-dashboard");
    }
  } else {
    request.session.error = "Invalid credentials";
    result.redirect("/login");
  }
};

/*
 * GET logout page.
 */
module.exports.logout = function(request, result) {
  console.log("Logging out:");

  if (request.session.user) {
    var name = request.session.user;
    console.log(name);

    request.session.destroy(function() {
      console.log(name + " logged out.");
    });
    result.redirect("/");
  } else {
    console.log("Nobody is currently logged in!");
    result.redirect("/");
  }
};

/*
 * GET register page.
 */
module.exports.get_register = function(request, result) {
  result.render("register", { message: "" });
};

/*
 * POST register page.
 */
module.exports.post_register = function(request, result) {
  var email = request.body.email;
  var password = request.body.password;
  var name = request.body.name;
  var role = request.body.role;
  console.log(role);
  if (map.has(email)) {
    result.render("register", { message: "Email Id already exists." });
  } else {
    map.set(email, { password: password, name: name, role: role });
    request.session.error = "";
    result.redirect("/login");
  }
};

/*
 * Get user dashboard
 */
module.exports.get_user_dashboard = function(request, result) {
  result.render("user-dashboard", { user: map.get(request.session.user).name });
};

/*
 * Get user dashboard
 */
module.exports.post_user_dashboard = function(request, result) {

  var email = request.session.user;
  var name =  map.get(request.session.user).name;
  var password =  map.get(request.session.user).password;
  var role =  map.get(request.session.user).role;
  var dob = request.body.dob;
  var gender = request.body.gender;
  var tele = request.body.tele;
  var add1 = request.body.add1;
  var add2 = request.body.add2;
  var city = request.body.city;
  var country = request.body.country;
  var state = request.body.state;
  var postalCode = request.body.postalCode;
  profileMap.set(email, { name:name, password:password, role:role, dob: dob, gender: gender, tele: tele, add1: add1, add2:add2, city:city, country:country, state:state, postalCode:postalCode });
  result.redirect("/profile"); 
};

/*
 * Get user profile dashboard
 */
module.exports.get_profile= function(request, result) {
  var email = request.session.user;
  var role = profileMap.get(email).role;
  if (role == "user") {
    result.render("user_profile", {email: email, profile: profileMap.get(email)});
  } else {
    result.render("business_profile", {email: email, profile: profileMap.get(email)});
  }
};


/*
 * Get business dashboard
 */
module.exports.get_business_dashboard = function(request, result) {
  result.render("business-dashboard", {
    user: map.get(request.session.user).name
  });
};

/*
 * POST business dashboard
 */
module.exports.post_business_dashboard = function(request, result) {
  result.redirect("/business-dashboard");
};
