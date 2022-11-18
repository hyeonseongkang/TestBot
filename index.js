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

var test_channel = "C04AE27LV0D";

const rtm = new RTMClient(token);
rtm.start();

rtm.on("ready", async () => {
  const rdy1 = await rtm.sendMessage("테스트를 시작한다.", test_channel);
  console.log("테스트 루틴 시작이다.");
  status++;

  const rdy2 = await rtm.sendMessage("hi", test_channel);
});

rtm.on("message", function (message) {
  var text = message.text;

  console.log("받은 메시지: ", text);

  if (status == 1) {
    if (text == "Hello!") {
      console.log("테스트#1 성공");
    } else {
      console.log("테스트#1 실패");
    }
  }
  status++;
});
