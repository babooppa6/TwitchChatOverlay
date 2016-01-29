/*
*   This script's purpose is to connect to a twitch chat room, and then display
*   those chat messages in a browser window, to be used as a CLR-browser with
*   video capturing software such as OBS (https://obsproject.com/).
*
  /*  ========== CHANNEL TO JOIN ========== */
  var channel = "lakebird";
  /*Connection Details. Leave unchanged if connecting to twitch chat*/
  var port = 80;  // ports: 6667, 6697 - Note use port 80 on restrictive network
  var url = "ws://irc.twitch.tv";
  var anonymousUser = "justinfan100725134500119";
  messageArray = new Array();
  clearTimer = setTimeout(clear, 0);

  /*Filter Keywords: Will highlight in chat */
   keywordArray = ["lakebird", "@lakebird", "!important"];
  /* Filtered users will not show up in on-screen chat */
   filteredUsers = [];

  function connect() {
    socket = new WebSocket(url.concat(":", port));

    socket.onopen = function() {
      socket.send('NICK ' + anonymousUser);
      socket.send('JOIN #' + channel);
    };

  //React to incomming messages.
    socket.onmessage = function(data) {
  //respond to PING to keepalive connection.
      if (data.data.lastIndexOf('PING', 0) === 0) {
		    socket.send('PONG :tmi.twitch.tv');
        console.log(data.data);
        console.log("Pong is great");
      }

  /* Check if there is a new message from chat. */
      if(data.data.indexOf("PRIVMSG") > -1) {
        messageArray.push(cleanupMessage(data.data));
      }
    };
  };


  function appendMessage(user, message){
      $("#target").prepend('<div class="messageContainer"><em class="username">' + user +':</em> ' + message + '</div>');
      $("#target div:first-child").animate({left: "+=2000"},800);
      if(keywordFound(message))
      {
        $("#target div:first-child").animate({backgroundColor: "rgba(233, 30, 99, 0.7)"},800);
      }
      $("#target div:first-child").delay(10000).animate({left: "-=2000"},800);
      clearTimeout(clearTimer);
      clearTimer = setTimeout(clear, 10850);
  }



  function cleanupMessage(string) {
    var usernameExpression = /\:(.*?)\!/;
    var chatName = string.match(usernameExpression)[1];
    var messageExpression = /(?:.*?\:){2}(.*)/
    var message = string.match(messageExpression)[1];
    appendMessage(chatName, message);
    return(chatName + ": " + message);
  }


function clear()
{
  $("#target div").remove();
}

function appendMessage(user, message){
    if(filterOutUsername(user))
      return;
    $("#target").prepend('<div class="messageContainer"><em class="username">' + user +':</em> ' + message + '</div>');
    $("#target div:first-child").animate({left: "+=2000"},800);
    if(keywordFound(message))
    {
      $("#target div:first-child").animate({backgroundColor: "rgba(233, 30, 99, 0.7)"},800);
    }
    $("#target div:first-child").delay(10000).animate({left: "-=2000"},800);
    clearTimeout(clearTimer);
    clearTimer = setTimeout(clear, 10850);
}

function keywordFound(message) {
  message = message.toLowerCase();
  for(var i = 0; i < keywordArray.length; i++)
  {
    if(message.search(keywordArray[i].toLowerCase()) > -1)
    {
      return true;
    }
  }
    return false;
}

function filterOutUsername(username) {
  username = username.toLowerCase();
  for(var i = 0; i < filteredUsers.length; i++)
  {
    if(username.search(filteredUsers[i].toLowerCase()) > -1)
    {
      return true;
    }
  }
    return false;
}

$(document).ready(function() {
    connect();
});
