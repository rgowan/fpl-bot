const SlackBot = require('slackbots');

let bot = null;

function createBot() {
  bot = new SlackBot({
    token: process.env.ACCESS_TOKEN,
    name: 'FPL Bot'
  });

  return bot;
}

function getBot() {
  return bot;
}

module.exports = { createBot, getBot };