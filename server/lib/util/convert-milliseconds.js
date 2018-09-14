"use strict";

module.exports = function(milliseconds) {
  // setup date date vs post date
  let date = Date.now();
  let tweetDate = date - milliseconds;
  let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
  total_seconds = parseInt(Math.floor(tweetDate / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);
  days = parseInt(Math.floor(total_hours / 24));

  // set if seconds, minutes, hours, or days in post age
  if (days >= 1) {
    return `${days} days ago`
  } else if (hours >= 1) {
    return `${hours} hours ago`
  } else if (minutes >= 1){
    return `${minutes} minutes ago`
  } else {
    return `${seconds} seconds ago`
  }
};

