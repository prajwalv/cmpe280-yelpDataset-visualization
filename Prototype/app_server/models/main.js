var mongoose = require("mongoose");

var User = require("./user");

module.exports.get_admin_dashboard = function(request, result) {
  User.find({ name: { $ne: 'Admin' }}, 'id name', function(err, userList) {
    console.log(userList);
    if (err) throw err;
    result.render("admin-dashboard", { user: 'Admin', userList: userList });
  });
};

module.exports.get_user = function(request, result) {
  User.findOne({ id: parseInt(request.params.userId)}, {
      id: 1,
      email: 1, 
      name: 1,
      dob: 1,
      gender: 1,
      tele: 1,
      add1: 1,
      add2: 1,
      city: 1,
      country: 1,
      state: 1,
      postalCode: 1}, function(err, userData) {
    console.log(userData);
    if (err) throw err;
    result.render("user", {
      email: userData.email,
      profile: userData
    });
  });
};

module.exports.add_user = function(request, result) {
  get_max_id().then(maxId => {
    var id = parseInt(maxId) + 1;
    User.create({
      id: id,
      email: request.body.email, 
      name: request.body.name,
      password: "Default@123",
      role: "user",
      dob: request.body.dob,
      gender: request.body.gender,
      tele: request.body.tele,
      add1: request.body.add1,
      add2: request.body.add2,
      city: request.body.city,
      country: request.body.country,
      state: request.body.state,
      postalCode: request.body.postalCode,
      createdBy: request.session.user,
      isActive: true

    }, function(err, userData) {
      console.log(userData);
      if (err) throw err;
      result.redirect("/admin-dashboard")
    });
  });
};

  function get_max_id() {
    return new Promise((resolve, reject) => {
      User.findOne().sort({
        "id": -1
    })
    .exec( function(err, dat) {
        if (err) {
          reject(500);
        }
        resolve(dat.id);
      }
    )
    });
  }

