# TwitchChatOverlay

A simple overlay made in Javascript to be used with the OBS-program for streaming to twitch.tv.
The script uses a websocket to connect to twitch.tv irc chat for a specific channel with an anonymous user. After establishing the connection it listens to incoming chat on the socket connection and displays them as divs, styled and animated with css and javascript.

To change which channel is listened to, change the **channel** var in the twitchCat.js file to match the streamer's username (all lowercase).

similarly, the **keywordArray** should be changed to contain words which should make a message highlighted with a different background color.
