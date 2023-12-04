const fs = require("fs");
const path = require("path");

const part1 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");

    let result = 0;
    for (let i = 0; i < data.length; i++) {
      let counter = 0;

      let cardValue = 0;
      let card = data[i].split(":")[0].split(" ")[1];
      let winningNumbers = data[i].split("| ")[1].split(" ");
      let numbers = data[i].split(': ')[1].split(" | ")[0].split(" ");
      for (let j = 0; j < numbers.length; j++) {
        if (numbers[j] !== '' && winningNumbers.includes(numbers[j])) {
          if (counter === 0) {
            cardValue = 1;
          } else {
            cardValue = cardValue * 2;
          }
          counter++;
        }
      }
      result += cardValue;
    }

    console.log("Day 4 Part 1 Result: " + result);
  });
};

module.exports = part1;
