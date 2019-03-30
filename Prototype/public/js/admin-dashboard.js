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
  document.body = event.target.value;
}
function search_users() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search_user");
  filter = input.value.toUpperCase();
  ul = document.getElementById("user_list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


