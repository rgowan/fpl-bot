const SlackBot = require('slackbots');
const getPlayerData = require('./scripts/getPlayerData');

require('dotenv').config();

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'FPL Top Picks'
});

bot.on('start', () => {
  createMessage();
});

async function createMessage() {
  const messageArray = [
    'Here are the top performers from last GW ⚽️️️️️ 🏆\n\n',
    '\t  Name | Club | Price | Position | Form\n\n'
  ];

  const players = await getPlayerData();

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  bot.postMessageToChannel('fpl', messageArray.join(''));
}