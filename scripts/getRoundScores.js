const puppeteer = require('puppeteer');

async function getTopPlayers() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://fantasy.premierleague.com/a/statistics/event_points');

  let data = await page.evaluate(() => {
    const topPlayers = [];

    const playerNameAll = document.querySelectorAll('.ismjs-show-element.ism-table--el__name');
    const playerClubAll = document.querySelectorAll('.ism-table--el__strong');
    const playerPositionAll = document.querySelectorAll('.ism-table--el__pos');
    const playerKitAll = document.querySelectorAll('.ism-media__figure picture source');
    const playerPriceAll = document.querySelectorAll('tr td:nth-child(3)');
    const playerSelectedByAll = document.querySelectorAll('tr td:nth-child(4)');
    const playerFormAll = document.querySelectorAll('tr td:nth-child(5)');
    const playerRoundScoreAll = document.querySelectorAll('tr td:nth-child(7)');

    for(let index = 0; index < 10; index++) {
      const playerShirtSrc = playerKitAll[index].srcset.split('\n')[1].trim().slice(0, -6);

      const player = {
        name: playerNameAll[index].innerText,
        club: playerClubAll[index].innerText,
        position: playerPositionAll[index].innerText,
        cost: playerPriceAll[index].innerText,
        selectedBy: playerSelectedByAll[index].innerText,
        form: playerFormAll[index].innerText,
        shirt: `https://fantasy.premierleague.com${playerShirtSrc}`,
        score: playerRoundScoreAll[index].innerText
      };

      topPlayers.push(player);
    }
    return topPlayers;
  });

  return data;
}

module.exports = getTopPlayers;