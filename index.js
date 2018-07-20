const SlackBot = require('slackbots');
const getRoundScores = require('./scripts/getRoundScores');

require('dotenv').config();

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'FPL Bot'
});

createMessage();

async function createMessage(channel) {
  try {
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
  } catch (err) {
    console.log('something went wrong');
  }
}