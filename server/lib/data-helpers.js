"use strict";

module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet)
      callback(null, true)
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find({}).toArray(function(err,result) {
        if (err) throw err
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, result.sort(sortNewestFirst));
      })
    }
  };
}