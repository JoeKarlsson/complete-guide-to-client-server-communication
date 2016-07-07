'use strict'

function reqListener (data) {
  document.body.innerHTML += this.responseText + '<br>';
}

setInterval(function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "/api");
  oReq.send();
}, 3000);