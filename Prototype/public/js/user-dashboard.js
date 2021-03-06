var colorWell;
var defaultColor = "#0000ff";

$(function() {
  $("#tabs").tabs();
});
$(function() {
  $("#dob").datepicker();
});
$(function() {
  $("#selectable").selectable({
    cancel: "a,input"
  });
});

window.addEventListener("load", startup, false);
function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
};
function updateFirst(event) {
    document.body.style.backgroundColor = event.target.value;
}

function updateAll(event) {
  document.body = event.target.value;
}
