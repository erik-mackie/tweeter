"use strict";

const MONGODB_URI = "mongodb://localhost:27017/tweeter";
// Defines helper functions for saving and getting tweets,
//using the database `db`
module.exports = function makeDataHelpers(tweetDatabase) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        tweetDatabase.collection("tweets").insertOne(newTweet);

        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      tweetDatabase.collection("tweets").find().toArray(callback);
    }

  };
}
