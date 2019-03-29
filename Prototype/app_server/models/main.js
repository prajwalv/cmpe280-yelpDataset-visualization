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
    result.render("user", { user: 'Admin', userData: userData });
  });
};
