/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var tweetData = [
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
]

$(function() {
  function renderTweets (tweetsStorage) {
    tweetsStorage.forEach(tweet => {
      let newItem = createTweetElement(tweet);
      console.log(newItem)
      $(newItem).appendTo('.tweet-container');
    })
  }

  //create HTML Element
  function createTweetElement (storedTweet) {
    const avatar = storedTweet.user.avatars.regular;
    const handle = storedTweet.user.handle;
    const name = storedTweet.user.name;
    const content = storedTweet.content.text;
    const createdAt = storedTweet.created_at;
    console.log("test")
  const $tweet =  `
    <article class="tweet">
      <header>
        <img src="${avatar}">
        <h2>${name}</h2>
        <p>${handle}</p>
      </header>
      <div>
        <p>${content}</p>
      </div>
      <footer>
        <p>${createdAt}</p>
        <div>
          <img src="/images/flag.png">
          <img src="/images/share.png">
          <img src="/images/heart1.png">
        </div>
      </footer>

    </article>
    `
   return $tweet
  }

    renderTweets(tweetData);
})




/*$('<article>').addClass('tweet');
  $('<header>').append($tweet);
  $('header').prepend(`<img src='${avatar}'/>`); // image
  $('<h2>').text(name).appendTo('header'); // name
  $('<p>').text(handle).appendTo('header'); // header
  $('<div>').appendTo('article');
  $('<p>').text(content).appendTo('article div'); // content
  $('<footer>').append($tweet);
  $('<p>').text()
*/
