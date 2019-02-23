var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var index = require("./app_server/routes/index");
var app = express();

//View engine setup
app.set("views", path.join(__dirname, "app_server", "views/html"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public", "stylesheets")));
app.use(express.static(path.join(__dirname, "public", "js")));
app.use(express.static(path.join(__dirname, "public", "images")));
app.use(session({ secret: "String for encrypting cookies." }));

app.use("/", index);
console.log("Server started at port 3000");
module.exports = app;
app.listen(3000);

