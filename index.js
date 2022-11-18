const { RTMClient } = require("@slack/rtm-api");

var token = "xoxb-4242129451747-4391602555475-uVOQeLU0FWyznZtANBnB2jUz";

var rtm = new RTMClient(token);
rtm.start();

rtm.on("message", function (message) {
  var channel = message.channel;
  var text = message.text;

  if (text == "hello") rtm.sendMessage("hi", channel);
  else rtm.sendMessage("what?", channel);
});
