const puppeteer = require('puppeteer');

// function extractTotalPlayerInfo() {
//   const players = [];

//   const playerNameAll = document.querySelectorAll('.ismjs-show-element.ism-table--el__name');
//   const playerClubAll = document.querySelectorAll('.ism-table--el__strong');
//   const playerPositionAll = document.querySelectorAll('.ism-table--el__pos');
//   const playerPriceAll = document.querySelectorAll('tr td:nth-child(3)');
//   const playerFormAll = document.querySelectorAll('tr td:nth-child(5)');
//   const playerScoreAll = document.querySelectorAll('tr td:nth-child(6)');

//   for (let i = 0; i < 10; i++) {
//     const player = {
//       name: playerNameAll[i].innerText,
//       club: playerClubAll[i].innerText,
//       position: playerPositionAll[i].innerText,
//       cost: playerPriceAll[i].innerText,
//       form: playerFormAll[i].innerText,
//       score: playerScoreAll[i].innerText
//     }

//     players.push(player);
//   }

//   return players;
// }

function extractRoundPlayerInfo() {
  const players = [];

  const playerNameAll = document.querySelectorAll('.ismjs-show-element.ism-table--el__name');
  const playerClubAll = document.querySelectorAll('.ism-table--el__strong');
  const playerPositionAll = document.querySelectorAll('.ism-table--el__pos');
  const playerPriceAll = document.querySelectorAll('tr td:nth-child(3)');
  const playerFormAll = document.querySelectorAll('tr td:nth-child(5)');
  const playerScoreAll = document.querySelectorAll('tr td:nth-child(7)');

  for (let i = 0; i < 10; i++) {
    const player = {
      name: playerNameAll[i].innerText,
      club: playerClubAll[i].innerText,
      position: playerPositionAll[i].innerText,
      cost: playerPriceAll[i].innerText,
      form: playerFormAll[i].innerText,
      score: playerScoreAll[i].innerText
    }

    players.push(player);
  }

  return players;
}

async function getPlayerData() {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  // await page.goto('https://fantasy.premierleague.com/a/statistics/total_points');
  // let totalScores = await page.evaluate(extractTotalPlayerInfo);

  await page.goto('https://fantasy.premierleague.com/a/statistics/event_points');
  let roundScores = await page.evaluate(extractRoundPlayerInfo);

  return roundScores;
}

module.exports = getPlayerData;