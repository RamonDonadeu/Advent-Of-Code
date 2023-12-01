const fs = require("fs");
const path = require("path");
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      let line = data[i];
      let firstNumber = -1;
      let lastNumber = -1;
      line = line.replaceAll("one", "one1one");
      line = line.replaceAll("two", "two2two");
      line = line.replaceAll("three", "three3three");
      line = line.replaceAll("four", "four4four");
      line = line.replaceAll("five", "five5five");
      line = line.replaceAll("six", "six6six");
      line = line.replaceAll("seven", "seven7seven");
      line = line.replaceAll("eight", "eight8eight");
      line = line.replaceAll("nine", "nine9nine");
      console.log(line);
      for (let j = 0; j < line.length; j++) {
        if (line[j] > "0" && line[j] <= "9" && firstNumber === -1) {
          firstNumber = line[j];
        }
        if (line[j] > "0" && line[j] <= "9") {
          lastNumber = line[j];
        }
      }
      let value = parseInt(firstNumber + lastNumber);
      console.log(value);
      count += value;
    }

    console.log("Day 1 Part 2 Result: " + count);
  });
};

module.exports = part2;
