"use strict";



$(function() {

  // render tweets from tweets library
  function renderTweets (tweetsStorage) {
    tweetsStorage.reverse().forEach(tweet => {
      let newItem = createTweetElement(tweet);
      $(newItem).appendTo('.tweet-container');
    });
  }

  //create HTML Element
  function createTweetElement (storedTweet) {
    const avatar = storedTweet.user.avatars.regular;
    const handle = storedTweet.user.handle;
    const name = storedTweet.user.name;
    const content = storedTweet.content.text;
    const createdAt = storedTweet.created_at;

    //cross site scripting
    function escape (str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    //convert created at to useable date
    function convertMilliseconds (milliseconds) {
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
        return `${days} days ago`;
      } else if (hours >= 1) {
        return `${hours} hours ago`;
      } else if (minutes >= 1){
        return `${minutes} minutes ago`;
      } else {
        return `${seconds} seconds ago`;
      }
    }

    //tweet to add
    const $tweet =  `
      <article class="tweet">
        <header>
          <img src="${avatar}">
          <h2>${escape(name)}</h2>
          <p>${escape(handle)}</p>
        </header>
        <div>
          <p>${escape(content)}</p>
        </div>
        <footer>
          <p>${convertMilliseconds(createdAt)}</p>
          <div>
            <img src="/images/flag.png">
            <img src="/images/share.png">
            <img src="/images/heart1.png">
          </div>
        </footer>
      </article>
      `;
    return $tweet;
  }

  // fetch tweets
  function loadTweets () {
    $.ajax('/tweets/', { method: 'GET' })
      .then(function (response) {
        renderTweets(response);
      });
  }
  loadTweets();

  // post data from form with AJAX
  $('.new-tweet form').submit(function (event) {
    event.preventDefault();
    const passedTweet = $('.new-tweet form textArea');
    const errorResponse = $('#wrapper');
    let validedTweet;

    // validate form input and respond with errors
    if (!passedTweet.val()) {
      errorResponse.slideDown(function() {
        $('#text-error').css('display', 'flex');
        $('#text-error #errorText').empty().append("Please Chirp Before Submitting");
      });
    } else if (passedTweet.val().length > 140) {
      errorResponse.slideDown(function() {
        $('#text-error').css('display', 'flex');
        $('#text-error #errorText').empty().append("Don't out sing the other birdies");
      });
    } else {
      errorResponse.slideUp();
      validedTweet = passedTweet.serialize();
    }

    // if tweet is valid, run ajax
    if (validedTweet) {
      $.ajax('/tweets/', {
        method: 'POST',
        data: validedTweet
      })
        .then(function () {
          $('.tweet-container').empty();
          loadTweets();
          $('.new-tweet form textArea').val("");
        });
    }
  });

  // on compose click toggle form visibility
  $('#nav-bar button').click(function() {
    // refactor DOM traversals in lets
    $('.new-tweet').slideToggle("fast");
    $('.new-tweet textarea').focus();
  });

});

