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

app.get('/lotto', (req, res) => {
  //Below is an object {arr: [<numbers>]}
  const numbers = req.query.number; 
  function randomNumber() {
    return Math.ceil(Math.random() * 20);
  } 
  const randomArray = [randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber(), randomNumber()]

  numbers.map(number => {
    let newNumber = parseInt(number);
    if(isNaN(newNumber) || typeof newNumber !== 'number') {
      return res.status(400).send('Input must be a number');
    }
    
    if (newNumber > 20 || newNumber < 1) {
      return res.status(400).send('Numbers should be numbers between 1 and 20');
    }

    if(Number.isInteger(newNumber)) {
      return res.status(400).send('Numbers should be whole numbers');
    }
  });

  function lottoMatch (queryArray, randomNumberArray) {
    let array = [];
    for(let i = 0; i < queryArray.length; i++) {
      for(let j = 0 ; j < randomNumberArray.length; j++) {
        if (queryArray[i] == randomNumberArray[j]) {
          array.push('match');
        }
      }
    }
    if(array.length < 4) {
      return 'sorry, you lose';
    }
    if(array.length === 4) {
      return 'COngrats, you win a free ticket';
    }
    if(array.length ===5) {
      return 'Congrats! You win $100';
    }
    if(array.length >= 6) {
      return 'Wow! Unbelievable! You could have won the mega millions!';
    }
  }

  res.send(lottoMatch(numbers,randomArray));
});