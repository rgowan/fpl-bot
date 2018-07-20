const SlackBot = require('slackbots');
const getRoundScores = require('./scripts/getRoundScores');

require('dotenv').config();

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'FPL Bot'
});

createMessage();

async function createMessage(channel) {
  const messageArray = [
    '>>>',
    'Here are the top performers from last GW ⚽️️️️️ 🏆\n\n',
    'Score | Name | Club | Price | Position | Form\n\n'
  ];

  const players = await getRoundScores();

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  bot.postMessageToChannel('fpl', messageArray.join(''));
}