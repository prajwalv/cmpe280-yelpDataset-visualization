var colorWell;
var defaultColor = "#0000ff";


window.addEventListener("load", startup, false);
function startup() {
  $("#selectable").selectable({
    cancel: "a,input"
  });
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}
function updateFirst(event) {
  document.body.style.backgroundColor = event.target.value;
}
function updateAll(event) {
  //document.body = event.target.value;
}

function updateUser(userId) {
  $.ajax({
    url: "/user/" + userId,
    method: "PUT",
    data: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      tele: document.getElementById("tele").value,
      add1: document.getElementById("add1").value,
      add2: document.getElementById("add2").value,
      city: document.getElementById("city").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      postalCode: document.getElementById("postalCode").value
    },
    success: function(response) {
      console.log(response);
      window.location.href = "/admin-dashboard";
    }
  }).error(function(err) {
    console.log(err);
    window.location.href = "/admin-dashboard";
  });
}

function deleteUser(userId) {
  $.ajax({
    url: "/user/" + userId,
    method: "DELETE",
    success: function(response) {
      console.log(response);
    }
  }).error(function(err) {
    console.log(err);
  });
}

