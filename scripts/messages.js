const { getRoundScores, getTotalScores } = require('./getData');

async function roundScoreMessage() {
  const players = await getRoundScores();

  const messageArray = [
    '>>>* Here are the top performers from last GW ⚽️️️️️ ⭐️*\n\n',
    'Score | Name | Club | Price | Position | Form\n\n'
  ];

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  return messageArray;
}

async function totalScoreMessage() {
  const players = await getTotalScores();

  const messageArray = [
    '>>>* Here are the top performers from this season ⚽️️️️️ 🏆*\n\n',
    'Score | Name | Club | Price | Position | Form\n\n'
  ];

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  return messageArray;
}

module.exports = { roundScoreMessage, totalScoreMessage };