require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 3000;

const { totalScoreMessage, roundScoreMessage } = require('./scripts/messages');

const app = express();

function sendMessages() {
  roundScoreMessage();
  totalScoreMessage();

  // roundScoreMessage()
  // .then(() => {
  //   totalScoreMessage();
  // });
}

// new Date().getDay() === 5 ? sendMessages() : process.exit();

sendMessages();

// totalScoreMessage();
// roundScoreMessage();


app.listen(PORT);
