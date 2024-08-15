const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


// A) Function: findSummation
function findSummation(number) {
  if (typeof number !== 'number' || number <= 0) {
    return false;
  }

  let sum = 0;
  for (let i = 1; i <= number; i++) {
    sum += i;
  }
  return sum;
}

// B) Function: uppercaseFirstandLast
function uppercaseFirstandLast(str) {
  const words = str.split(' ');
  const modifiedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const lastLetter = word.charAt(word.length - 1).toUpperCase();
    const middleLetters = word.slice(1, word.length - 1);
    return `${firstLetter}${middleLetters}${lastLetter}`;
  });
  return modifiedWords.join(' ');
}

// C) Function: findAverageAndMedian
function findAverageAndMedian(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 'Invalid input array';
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;

  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  const median = sortedNumbers.length % 2 === 0
    ? (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2
    : sortedNumbers[Math.floor(sortedNumbers.length / 2)];

  return { average, median };
}

// D) Function: find4Digits
function find4Digits(str) {
    const numbers = str.split(' ');
    for (const num of numbers) {
      // Check if the number is a four-digit number
      if (num.length === 4 && /^\d+$/.test(num)) {
        // Return the four-digit number if found
        return num;
      }
    }
      return false;
  }
  

// Routes

app.get('/findSummation', (req, res) => {
    const number = parseInt(req.query.number);
    const result = findSummation(number);
    res.send(`Summation of numbers from 1 to ${number} is ${result}`);
  });
  
  app.get('/uppercaseFirstandLast', (req, res) => {
    const string = req.query.string;
    const result = uppercaseFirstandLast(string);
    res.send(`Modified string: ${result}`);
  });
  
  app.get('/findAverageAndMedian', (req, res) => {
    const numbersString = req.query.numbers;
    const numbers = numbersString.split(',').map(Number);
    const { average, median } = findAverageAndMedian(numbers);
    res.send(`Average: ${average}, Median: ${median}`);
  });
  
  app.get('/find4Digits', (req, res) => {
    const string = req.query.string;
    const result = find4Digits(string);
    res.send(`First 4-digit number: ${result}`);
  });

  app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});