/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/*var tweetData = [
{
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];*/

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

    // prevent cross site scripting
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

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

  function convertMilliseconds(milliseconds) {
    // setup date date vs post date
    let date = Date.now();
    let tweetDate = date - milliseconds;
    let days, hours, minutes, total_hours, total_minutes, total_seconds;
    total_seconds = parseInt(Math.floor(tweetDate / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    //fix seconds call
    //fix seconds call
    days = parseInt(Math.floor(total_hours / 24));
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    // set if minutes, hours, or days in post age
    if (days >= 1) {
      return `${days} days ago`
   } else if (hours >= 1) {
      return `${hours} hours ago`
   } else {
      return `${minutes} minutes ago`
   }
  };

  // fetch tweets
  function loadTweets () {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (response) {
      renderTweets(response);
    })
  }


  function validate (tweet) {
    if (!tweet.val()) {
      alert("Please chirp before submitting");
      return;
    } else if (tweet.val().length > 140) {
      alert("Don't out sing the other birds");
      return;
    } else {
      return tweet.serialize();
    }
  }

// post data from form with AJAX
  $('.new-tweet form').submit(function (event) {
    event.preventDefault();
    const validedTweet = validate($('.new-tweet form textArea'));
    if (validedTweet) {
      $.ajax('/tweets/', {
        method: 'POST',
        data: validedTweet
      })
      .then(function (err, response) {
        $('.tweet-container').empty()
        loadTweets();
        $('.new-tweet form textArea').val("");

      })
    }
  });

});


