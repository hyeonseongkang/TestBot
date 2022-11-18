require("dotenv").config();

const { RTMClient } = require("@slack/rtm-api");

const fs = require("fs");

var status = 0;

let token;

try {
  token = fs.readFileSync("./token").toString("utf-8");
} catch (err) {
  console.error(err);
}
var rtm = new RTMClient(token);
rtm.start();

rtm.on("message", function (message) {
  var channel = message.channel;
  var text = message.text;

  if (text == "hello") rtm.sendMessage("hi", channel);
  else rtm.sendMessage("what?", channel);
});
