var mongoose = require("mongoose");

var User = require("./user");

module.exports.get_admin_dashboard = function(request, result) {
  User.find({ name: { $ne: 'Admin' }}, 'id name', function(err, userList) {
    console.log(userList);
    if (err) return handleError(err);
    result.render("admin-dashboard", { user: 'Admin', userList: userList });
  });
};

module.exports.get_user = function(request, result) {
  User.findOne({ id: request.params.id}, function(err, userData) {
    console.log(userData);
    if (err) return handleError(err);
    result.render("u_profile", {
      email: userData.email,
      profile: userData
    });
  });
};

// module.exports.update_user = function(request, result) {
//   User.findOneAndUpdate({ id: request.params.id}, function(err, userData) {
//     console.log(userData);
//     if (err) return handleError(err);
//     result.render("user", { user: 'Admin', userData: userData });
//   });
// };


/*
 * Get user profile dashboard
 */
module.exports.get_profile = function(request, result) {
  var email = request.session.user;
  var role = map.get(email).role;
  if (role == "user") {
    result.render("u_profile", {
      email: email,
      profile: profileMap.get(email)
    });
  } else {
    result.render("business_profile", {
      email: email,
      profile: profileMap.get(email)
    });
  }
};
