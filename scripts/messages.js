const getPlayerData = require('./getData');

async function createMessage(type) {
  const messageTitle = type === 'round' ?
    '>>>* Here are the top performers from last GW ⚽️️️️️ ⭐️*\n\n' :
    '>>>* Here are the top performers from this season ⚽️️️️️ 🏆*\n\n';

  const messageArray = [
    messageTitle,
    'Score | Name | Club | Price | Position | Form\n\n'
  ];

  const players = await getPlayerData();

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  return messageArray;
}








// async function roundScoreMessage() {
//   const players = await getPlayerData();

//   const messageArray = [
//     '>>>* Here are the top performers from last GW ⚽️️️️️ ⭐️*\n\n',
//     'Score | Name | Club | Price | Position | Form\n\n'
//   ];

//   players.forEach((player) => {
//     const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
//     messageArray.push(playerString);
//   });

//   return messageArray;
// }

// async function totalScoreMessage() {
//   const players = await getTotalScores();

//   const messageArray = [
//     '>>>* Here are the top performers from this season ⚽️️️️️ 🏆*\n\n',
//     'Score | Name | Club | Price | Position | Form\n\n'
//   ];

//   players.forEach((player) => {
//     const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
//     messageArray.push(playerString);
//   });

//   return messageArray;
// }

module.exports = createMessage;