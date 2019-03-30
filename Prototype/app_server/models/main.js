var mongoose = require("mongoose");

var User = require("./user");
var csv = require("csv");

module.exports.get_admin_dashboard = function(request, result) {
  User.find({ name: { $ne: "Admin" } }, "id name", function(err, userList) {
    if (err) throw err;
    result.render("admin-dashboard", { user: "Admin", userList: userList });
  });
};

module.exports.get_user = function(request, result) {
  User.findOne(
    { id: parseInt(request.params.userId) },
    {
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
      postalCode: 1
    },
    function(err, userData) {
      if (err) throw err;
      if (userData) {
        result.render("user", {
          email: userData.email,
          profile: userData
        });
      } else {
        result.redirect("/admin-dashboard");
      }
    }
  );
};

module.exports.add_user = function(request, result) {
  get_max_id().then(maxId => {
    var id = parseInt(maxId) + 1;
    User.create(
      {
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
      },
      function(err, userData) {
        if (err) throw err;
        result.redirect("/admin-dashboard");
      }
    );
  });
};

module.exports.update_user = function(request, result) {
  User.updateOne(
    { id: parseInt(request.params.userId) },
    {
      email: request.body.email,
      name: request.body.name,
      tele: request.body.tele,
      add1: request.body.add1,
      add2: request.body.add2,
      city: request.body.city,
      country: request.body.country,
      state: request.body.state,
      postalCode: request.body.postalCode
    },
    function(err, userData) {
      if (err) throw err;
      result.redirect("/admin-dashboard");
    }
  );
};

module.exports.delete_user = function(request, result) {
  User.deleteOne({ id: parseInt(request.params.userId) }, function(err, dat) {
    if (err) throw err;
    result.redirect("/admin-dashboard");
  });
};

function get_max_id() {
  return new Promise((resolve, reject) => {
    User.findOne()
      .sort({
        id: -1
      })
      .exec(function(err, dat) {
        if (err) {
          reject(500);
        }
        resolve(dat.id);
      });
  });
}

function MyCSV(
  name,
  email,
  password,
  role,
  dob,
  gender,
  tele,
  add1,
  add2,
  city,
  country,
  state,
  postalCode,
  createdBy,
  isActive,
  id
) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.role = role;
  this.dob = dob;
  this.gender = gender;
  this.tele = tele;
  this.add1 = add1;
  this.add2 = add2;
  this.city = city;
  this.country = country;
  this.state = state;
  this.postalCode = postalCode;
  this.createdBy = createdBy;
  this.isActive = isActive;
  this.id = id;
}
/* Load records from csv to database */
module.exports.load_users = function() {
  var path = "./public/files/sample.csv";
  var obj = csv();
  var users = [];
  obj.from.path(path).to.array(function(data) {
    var i = 0;
    for (i = 0; i < data.length; i++) {
      var userData = new MyCSV(
        data[i][0],
        data[i][1],
        data[i][2],
        data[i][3],
        data[i][4],
        data[i][5],
        data[i][6],
        data[i][7],
        data[i][8],
        data[i][9],
        data[i][10],
        data[i][11],
        data[i][12],
        data[i][13],
        data[i][14],
        data[i][15]
      );
      add_users(userData).then(response => {
        console.log("inserted user");
      });
      if (i == data.length) {
        result.redirect("/admin-dashboard");
      }
    }
  });
};

function add_users(userData) {
  return new Promise((resolve, reject) => {
    User.create({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      password: userData.password,
      role: userData.role,
      dob: userData.dob,
      gender: userData.gender,
      tele: userData.tele,
      add1: userData.add1,
      add2: userData.add2,
      city: userData.city,
      country: userData.country,
      state: userData.state,
      postalCode: userData.postalCode,
      createdBy: userData.createdBy,
      isActive: true
    });
  });
}
