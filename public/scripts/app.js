/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function loadTweets() {
  return $.ajax('/tweets', { method: 'GET' })
  return tweets;
}

function loadNewTweet() {
  return $.ajax('/tweets', { method: 'GET' })
  return tweets[tweets.length];
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (tweet in tweets) {
    let tweetHtml = createTweetElement(tweets[tweet]);
    $('#tweets-container').prepend(tweetHtml);
  }  
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function timePassed(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function createTweetElement(tweet) {
  // let $tweet = $('<article>').addClass('tweet');
  // ...
  // let articleElm = document.createElement('article');
  // let headerElm = document.createElement('header');
  // let imgElm = document.createElement('img');
  // let spanElm = document.createElement('span');

  // articleElm.appendChild(headerElm);
  // headerElm.classList.add("message-header");
  // headerElm.appendChild(imgElm);
  // imgElm.classList.add("message-logo");
  // imgElm.attr("src", tweet.user.avatars.small)
  // imgElm.append(spanElm);
  // spanElm.classList.add("message-id");
  // spanElm.add(document.createTextNode(tweet.user.avatars.small))

  // console.log(imgElm)  
  // return imgElm;

  let $tweet = 
  `
  <article>
    <header class="message-header">
    <img class="message-logo" src=${tweet.user.avatars.small}></img>
    <span class="message-name">
      ${escape(tweet.user.name)}
    </span>
    <span class="message-id">
    ${escape(tweet.user.handle)}
    </span>
    </header>
    <div class="message-body">
    ${escape(tweet.content.text)}
    </div>
    <footer class="message-footer">
      <div>${timePassed(tweet.created_at)}</div>
    </footer>
  </article>
  `
  return $tweet;
}

$(document).ready(function() {
  const dataPromise = loadTweets();
  dataPromise.then(function(tweetData){
    renderTweets(tweetData);
  });
  $('form').submit(function () {
    if ($('.text-area').val().length > 140){
      $('.error').text("Error: Tweet exceeds 140 characters!")
      $('.error').show(50)
    } else if (!$('.text-area').val()) {
      $('.error').text("Error: Tweet message not found!")
      $('.error').show(50)      
    } else {
      
      $.ajax({
        url:"/tweets",
        type: 'POST',
        data: $(this).serialize()
      }).then(function(){
        return loadNewTweet()
      }).then(function(tweetData){
        renderTweets(tweetData)
      });


      // const dataPromise = loadNewTweet();
      // dataPromise.then(function(tweetData){
      // renderTweets(tweetData);
      // });
      $('.error').hide(50)
    }
    event.preventDefault();
  });
  
  $('#compose').click(function () {
    $('.new-tweet').slideToggle();
    $('.text-area').focus();
    $('text-area').select();
  });

});
