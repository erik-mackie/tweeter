"use strict";

// prevent cross site scripting
module.exports = function (str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}