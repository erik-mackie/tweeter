/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var tweetData = [];

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
          <p>${convertMiliseconds(createdAt)}</p>
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


  function convertMiliseconds(milliseconds) {
    // setup date date vs post date
    let date = Date.now();
    let tweetDate = date - milliseconds;
    let days, hours, minutes, total_hours, total_minutes, total_seconds;
    total_seconds = parseInt(Math.floor(tweetDate / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));

    days = parseInt(Math.floor(total_hours / 24));
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    // set if minutes, hours, or days in post age
   if( days >= 1) {
    console.log("days")
    return `${days} days ago`
   } else if ( hours >= 1) {
    console.log("hours")
    return `${hours} hours ago`
   } else {
    console.log("minutes")
    return `${minutes} minutes ago`
   }
  };
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
