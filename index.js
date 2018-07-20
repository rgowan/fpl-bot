const express = require('express');
const SlackBot = require('slackbots');
const getRoundScores = require('./scripts/getRoundScores');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'FPL Bot'
});

async function createMessage(channel) {
  const players = await getRoundScores();

  const messageArray = [
    'Here are the top performers from last GW ⚽️️️️️ 🏆\n\n',
    'Score | Name | Club | Price | Position | Form\n\n'
  ];

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  bot.postMessageToChannel('general', messageArray.join(''));
}

createMessage();

app.listen(PORT);
