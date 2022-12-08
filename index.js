require("dotenv").config();

const { RTMClient } = require("@slack/rtm-api");

const fs = require("fs");

var status = 0;

let token;

try {
  token = fs.readFileSync("./token").toString("utf-8");
  todayMenuText = fs.readFileSync("./todayMenu.txt").toString("utf-8");
  weeklyMenuText = fs.readFileSync("./weeklyMenu.txt").toString("utf-8");
} catch (err) {
  console.error(err);
}

var test_channel = "C04AE27LV0D";

var today_menu_channel = "C04BF3141L5";

const rtm = new RTMClient(token);
rtm.start();

rtm.on("ready", async () => {
  // const rdy1 = await rtm.sendMessage("테스트를 시작한다.", test_channel);
  console.log("테스트 루틴 시작이다.");
  // status++;

  const rdy2 = await rtm.sendMessage("Hi", test_channel);
  status++;
});

const getMenuEvaluationCount = function (text) {
  const todaymenu = text.split(" ");
  let count = 0;
  for (var i in todaymenu) {
    for (var j in keyWords) {
      if (todaymenu[i].includes(keyWords[j])) {
        count += 1;
      }
    }
  }

  if (count > 3) {
    count = 3;
  }

  if (text === "오늘은 운영하지 않습니다.") {
    count = -1;
  }
  return count;
};

const getMenuEvaluationText = function () {
  const count = getMenuEvaluationCount(todayMenuText);
  if (count === -1) {
    return "";
  }
  return evalutions[count];
};

const sendWeeklyMenuEvaluation = function () {
  var sendMessage = "";
  const arr = weeklyMenuText.split("\n");
  for (var i = 0; i < arr.length - 1; i += 1) {
    if (i === arr.length - 1) {
      sendMessage += weekly[i] + evalutions[getMenuEvaluationCount(arr[i])];
    } else {
      sendMessage +=
        weekly[i] + evalutions[getMenuEvaluationCount(arr[i])] + "\n";
    }
  }
  if (sendMessage === "") {
    return;
  }
  return sendMessage;
};

const randomGreetings = ["Hello!!", "안녕하세요!!", "Bonjour@"];
const evalutions = ["☆☆☆", "★☆☆", "★★☆", "★★★"];
const weekly = ["월 - ", "화 - ", "수 - ", "목 - ", "금 - "];
const keyWords = ["고기", "초밥", "갈비", "볶음", "튀김"];

rtm.on("message", function (message) {
  var text = message.text;
  console.log(status);
  console.log("받은 메시지: ", text);

  switch (status) {
    case 1:
      var condi = randomGreetings.includes(text);

      if (condi) {
        console.log("테스트#1 성공");
      } else {
        console.log("테스트#1 실패");
      }
      rtm.sendMessage("오늘 밥 뭐야", test_channel);
      status++;
      console.log("테스트 #2 시작");
      break;

    case 2:
      if (text === todayMenuText) {
        console.log("테스트#2 성공");
      } else {
        console.log("테스트#2 실패");
      }
      console.log("테스트 #3 시작");
      status++;
      break;

    case 3:
      const evaluations = getMenuEvaluationText();
      if (text === evaluations) {
        console.log("테스트#3 성공");
      } else {
        console.log("테스트#3 실패");
      }
      rtm.sendMessage("이번주 뭐 나와", test_channel);
      status++;
      console.log("테스트 #4 시작");
      break;

    case 4:
      const weeklymenuEvaluation = sendWeeklyMenuEvaluation();
      if (text == weeklymenuEvaluation) {
        console.log("테스트#4 성공");
      } else {
        console.log("테스트#4 실패");
      }
      break;
  }
});
