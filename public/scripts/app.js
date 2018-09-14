
const convertMilliseconds = require("../lib/util/convert-milliseconds");
const escape = require("../lib/util/escape-string");

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
    })
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
      })
    } else {
      errorResponse.slideUp()
      validedTweet = passedTweet.serialize();
    }

    // if tweet is valid, run ajax
    if (validedTweet) {
      $.ajax('/tweets/', {
        method: 'POST',
        data: validedTweet
      })
      .then(function (err, response) {
        $('.tweet-container').empty();
        loadTweets();
        $('.new-tweet form textArea').val("");
      })
    }
  });

  // on compose click toggle form visibility
  $('#nav-bar button').click(function() {
    // refactor DOM traversals in lets
    $('.new-tweet').slideToggle("fast");
    $('.new-tweet textarea').focus();
  })

});




// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code

// decouple this code