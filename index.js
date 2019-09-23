'use strict';

const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const total = a + b;
  res.send(`The sum of ${a} and ${b} is ${total}`);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/cypher', (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift);

  function code (text, shift) {
    let newText = text.toUpperCase();
    let array = [];
    for(let i = 0; i < newText.length; i++) {
      let character = text[i].charCodeAt(0) + shift;
      array.push(character);
    }
  
    let newString = '';
    for(let i = 0; i < array.length; i++) {
      newString += String.fromCharCode(array[i]);
    }
    return newString;
  }

  res.send(`Your encripted cypher is ${code(text,shift)}`);
});

