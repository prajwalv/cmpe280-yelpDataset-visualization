var HashMap = require("hashmap");
var map = new HashMap();
/*
 * GET home page.
 */
module.exports.home = function(request, result) {
  result.render("index", { message: "" });
};
module.exports.loggedIn = function(request, result, next, error_next) {
  console.log("In loggedIn");
  if (request.session.user) {
    // Proceed if the user is logged in.
    console.log("Logged in: ");
    console.log(request.session.user);
    next();
  } else {
    console.log("Not logged in");
    //result.send("You must first log in.");
    error_next("You must first log in.");
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
  if (map.has(email)) {
    result.render("register", { message: "Email Id already exists" });
  } else {
    map.set(email, { password: password, name: name });
    result.render("index", { message: "" });
  }
};

/*
 * GET dashboard based on the role
 */
module.exports.post_login = function(request, result) {
  // var email = request.body.email;
  // var password = request.body.password;
  var email = "prajwal.venkatesh@sjsu.edu";
  var password = "Admin@123";
  var role = "user1";
  // if (map.has(email) && map.get(email).password === password) {
  if (role == "user") {
    if (email == email && password == password) {
      request.session.user = email;
      result.render("user-dashboard", { user: "Admin" });
    } else {
      result.render("index", { message: "Invalid credentials" });
    }
  } else {
    if (email == email && password == password) {
      request.session.user = email;
      result.render("business-dashboard", { user: "Admin" });
      // result.render("html/business-dashboard", { user: "Admin" });
    } else {
      result.render("index", { message: "Invalid credentials" });
    }
  }
};

/*
 * GET logout page.
 */
module.exports.get_logout = function(request, result) {
  console.log("Logging out:");

  if (request.session.user) {
    var name = request.session.user;
    console.log(name);

    request.session.destroy(function() {
      console.log(name + " logged out.");
    });

    result.send(name + " is now logged out.");
  } else {
    console.log("Nobody is currently logged in!");
    result.send("Nobody is currently logged in!");
  }
};

/*
 * GET login page.
 */
module.exports.get_login = function(request, result, message) {
  result.render("index", { message: message });
};
