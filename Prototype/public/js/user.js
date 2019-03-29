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
  //   $.ajax({
  //     url: "/user/" + userId,
  //     method: "PUT",
  //     success: function(response) {
  //       console.log(response);
  //     }
  //   }).error(function(err) {
  //     console.log(err);
  //   });
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
