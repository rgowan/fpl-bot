require('dotenv').config();

const express = require('express');
const SlackBot = require('slackbots');
const puppeteer = require('puppeteer');
const PORT = process.env.PORT || 3000;

const app = express();

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'FPL Bot'
});

function extractPlayerInfo() {
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
    };

    players.push(player);
  }

  return players;
}

async function getPlayerData() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(
    'https://fantasy.premierleague.com/a/statistics/event_points', {
      waitUntil: 'networkidle2'
    }
  );

  let roundScores = await page.evaluate(extractPlayerInfo);
  return roundScores;
}

async function createMessage() {
  const messageArray = [
    '>>>* Here are the top performers from last GW ⚽️️️️️ ⭐️*\n\n',
    'Score | Name | Club | Price | Position | Form\n\n'
  ];

  const players = await getPlayerData();

  players.forEach((player) => {
    const playerString = `${player.score}\t${player.name} ${player.club} ${player.cost} ${player.position} ${player.form}\n\n`;
    messageArray.push(playerString);
  });

  return messageArray.join('');
}

async function sendMessage() {
  const message = await createMessage();
  await bot.postMessageToChannel('general', message);
  process.exit();
}

sendMessage();

app.listen(PORT);