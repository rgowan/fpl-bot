require('dotenv').config();

const express = require('express');
const SlackBot = require('slackbots');
const PORT = process.env.PORT || 3000;

const {
  totalScoreMessage,
  roundScoreMessage
} = require('./scripts/messages');

const app = express();

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'FPL Bot'
});

async function sendMessages() {
  const roundScore = await roundScoreMessage();
  const totalScore = await totalScoreMessage();

  bot
    .postMessageToChannel('general', roundScore.join(''))
    .then(() => {
      return bot.postMessageToChannel('general', totalScore.join(''))
    })
    .then(() => process.exit())
    .catch(() => console.log('something went wrong'));
}

// new Date().getDay() === 5 ? sendMessages() : process.exit();
sendMessages();

app.listen(PORT);