//return for promise
function loadTweets() {
  return $.ajax('/tweets', { method: 'GET' })
  return tweets;
}

//prepending the tweets
function renderTweets(tweets) {
    for (tweet in tweets) {
    let tweetHtml = createTweetElement(tweets[tweet]);
    $('#tweets-container').prepend(tweetHtml);
  }  
}

//return for promise
function loadNewTweet() {
  return $.ajax('/tweets', { method: 'GET' })
  return tweets;
}

//rendering New tweet
function renderNewTweet(tweets) {
  const tweetHtml = createTweetElement(tweets);
  $('#tweets-container').prepend(tweetHtml);
}

//prevention of HTML code in inputs
function escape(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//now - time when the message was created
function timePassed(date) {

  const now = new Date()
  let timeDiff = (now - date) / 1000;
  // get seconds
  const seconds = Math.round(timeDiff % 60);
  // remove seconds from the date
  timeDiff = Math.floor(timeDiff / 60);
  // get minutes
  const minutes = Math.round(timeDiff % 60);
  // remove minutes from the date
  timeDiff = Math.floor(timeDiff / 60);
  // get hours
  const hours = Math.round(timeDiff % 24);
  // remove hours from the date
  timeDiff = Math.floor(timeDiff / 24);
  // the rest of timeDiff is number of days
  const days = timeDiff ;

  if (!minutes) {
    return `${seconds} sec`
  } else if (!hours) {
    return `${minutes} min ${seconds} sec`
  } else if (!days) {
    return `${hours} hrs ${minutes} min ${seconds} sec ago`
  } else {
    return `${days} days ${hours} hrs ${minutes} min ${seconds} sec ago`
  }
}

//to html format
function createTweetElement(tweet) {
    
  const $tweet = 
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
      <span class="time-passed">${timePassed(tweet.created_at)}</span>
    <button type="button" class="btn btn-info btn-sm">
      <span class="glyphicon glyphicon-thumbs-up"></span>
      <span class="like-count">${tweet.likes}</span>
    </button>
    </footer>
  </article>
  `
  return $tweet;
}

$(document).ready(function() {
  const dataPromise = loadTweets();
  dataPromise.then(function(tweetData){
    renderTweets(tweetData);
  })
  $('form').submit(function () {
    if ($('.text-area').val().length > 140){
      $('.error').text("Error: Tweet exceeds 140 characters!")
      $('.error').show(50)
    } else if (!$('.text-area').val()) {
      $('.error').text("Error: Tweet message not found!")
      $('.error').show(50)      
    } else {
      $.ajax({
        url:'/tweets',
        type: 'POST',
        data: $(this).serialize()
      }).then(function(){
        return loadNewTweet()
      }).then(function(tweetData){
        renderNewTweet(tweetData[tweetData.length - 1])
      });
      $('.error').hide(50)
    }
    event.preventDefault();
  })
  $('#compose').click(function () {
    $('.new-tweet').slideToggle();
    $('.text-area').focus();
    $('text-area').select();
  });
  $('#tweets-container').on('click','footer button',  function() {
  });
});