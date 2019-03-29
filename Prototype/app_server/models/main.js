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
  User.findOne({ id: request.params.id}, function(err, userData) {
    console.log(userData);
    if (err) throw err;
    result.render("user", {
      email: userData.email,
      profile: userData
    });
  });
};

module.exports.add_user = function(request, result) {
  var email = request.body.email;
  var name = request.body.name;
  var password = "Default@123";
  var role = "role";
  var dob = request.body.dob;
  var gender = request.body.gender;
  var tele = request.body.tele;
  var add1 = request.body.add1;
  var add2 = request.body.add2;
  var city = request.body.city;
  var country = request.body.country;
  var state = request.body.state;
  var postalCode = request.body.postalCode;
  var createdBy = request.session.user;
  var isActive = true;
  get_max_id().then(maxId => {
    User.create({

     id: { $inc: { maxId: 1 } },
      email: email, 
      name: name,
      password: password,
      role: role,
      dob: dob,
      gender: gender,
      tele: tele,
      add1: add1,
      add2: add2,
      city: city,
      country: country,
      state: state,
      postalCode: postalCode,
      createdBy: createdBy,
      isActive: isActive

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
    }, function(err, dat) {
        if (err) {
          reject(500);
        }
        resolve(dat.id);
      }
      );
    });
  }

