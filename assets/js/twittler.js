$(document).ready(function(){

  var countTweets = streams.home.length - 1;

    var showTweets = function(user){

      $tweetStream = $('.tweetStream');
      $tweetStream.html('');

      if(!!user){
        var index = streams.users[user].length - 1;
      } else {
        var index = streams.home.length - 1;
      }  

      while(index >= 0) {

        if(!!user){
          var tweet = streams.users[user][index];
        } else {
          var tweet = streams.home[index];
        }
  
        var message = tweet.message; 
        var tweetUser = tweet.user; 
        var tweetTimeStamp = jQuery.timeago(tweet.created_at);
        var $tweet = $(
          '<div class = "one-tweet span6">' +
            '<div class = "row">' +
              '<div class = "userName span"><a href="#" class = '+ tweetUser +'>' +
                '@' + tweetUser + ' - ' +
              '</a></div>'+ 
              '<div class = "tweetTime span">'+
                tweetTimeStamp + 
              '</div>' +
            '</div>' +
            '<div class = "row">' +
              '<p class = "message span6">' +
                message + 
              '</p>' +
              '</div>' +
            '</div>' +
          '</div>'
      );

      $tweet.appendTo($tweetStream);
      index = index - 1;
    }
    countTweets = streams.home.length - 1;
  }
  
  var tweetTime = 0; 
  var tweetUpdateTimer = function(){
    tweetTime = setInterval(function(){
      var checkNewTweets = streams.home.length - 1;
      if(checkNewTweets > countTweets){
        var numNewTweets = checkNewTweets - countTweets; 
        $('.tweetsAlert').text(numNewTweets + ' new Tweets');
        $('.updateTweets').slideDown();
      }
     }, 5000);
   }
         

  showTweets(); 
  tweetUpdateTimer(); 

  $('.updateFeeds').on('click', function(e){
    e.preventDefault(); 
    showTweets(); 
    $('.updateTweets').slideUp(); 
    clearInterval(tweetUpdateTimer);
    tweetUpdateTimer(); 
  }); 

 $('.tweetStream').on('click', 'a', function(e){
    e.preventDefault(); 
    $('.one-tweet').remove();
    $('.updateTweets').remove();
    var user = this.getAttribute('class');
    showTweets(user);
    clearInterval(tweetUpdateTimer);
 });


});