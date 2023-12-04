const fs = require("fs");
const path = require("path");
const slow = (data) => {

  console.time("Slow Script Execution Time");
  data = data.split("\n");
  let scratchCards = [0];
  for (let i = 0; i < data.length - 1; i++) {
    scratchCards.push(i + 1);
  }
  for (let i = 0; i < scratchCards.length; i++) {
    let counter = 0;
    let card =
      parseInt(data[scratchCards[i]].split(":")[0].split("Card")[1]) - 1;
    let winningNumbers = data[scratchCards[i]].split("| ")[1].split(" ");
    let numbers = data[scratchCards[i]]
      .split(": ")[1]
      .split(" | ")[0]
      .split(" ");
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j] !== "" && winningNumbers.includes(numbers[j])) {
        counter++;
      }
    }
    for (let k = 0; k < counter; k++) {
      scratchCards.push(card + k + 1);
    }
  }

  console.log("Day 4 Part 2 slow version Result: " + scratchCards.length);
  console.timeEnd("Slow Script Execution Time");
};
const cardCreatesCards = (results, cardNumber) => {
  let result = 0
  for (let i = 0; i < results[cardNumber]; i++){
    result += cardCreatesCards(results, cardNumber+1 + i)
  }
  return result + 1
};
const fast = (data) => {

  console.time("Fast Script Execution Time");
  data = data.split("\n");
  let scratchCards = [0];
  for (let i = 0; i < data.length - 1; i++) {
    scratchCards.push(i + 1);
  }
  let results = [];
  let result = 0
  for (let i = 0; i < data.length; i++) {
    let counter = 0;
    let card =
      parseInt(data[scratchCards[i]].split(":")[0].split("Card")[1]) - 1;
    let winningNumbers = data[scratchCards[i]].split("| ")[1].split(" ");
    let numbers = data[scratchCards[i]]
      .split(": ")[1]
      .split(" | ")[0]
      .split(" ");
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j] !== "" && winningNumbers.includes(numbers[j])) {
        counter++;
      }
    }
    results[card] = counter;
  }

  console.log(results)
  for (let i = 0; i < results.length; i++) {
    result += cardCreatesCards(results, i);
  }

  console.log("Day 4 Part 2 fast version Result: " + result);
  console.timeEnd("Fast Script Execution Time");
};
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fast(data);
    slow(data);
  });
};

module.exports = part2;
