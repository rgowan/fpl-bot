require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 3000;

const { totalScoreMessage, roundScoreMessage } = require('./scripts/messages');
const { createBot } = require('./config/bot');

const app = express();

function sendMessages() {
  roundScoreMessage();
  totalScoreMessage();
}

new Date().getDay() === 5 ? sendMessages() : process.exit();

app.listen(PORT);
