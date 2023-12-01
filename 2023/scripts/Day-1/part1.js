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
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      let firstNumber = -1;
      let lastNumber = -1;
      for (let j = 0; j < line.length; j++) {
        if (line[j] > "0" && line[j] <= "9" && firstNumber === -1) {
          firstNumber = (line[j]);
        }
        if (line[j] > "0" && line[j] <= "9") {
          lastNumber = (line[j]);
        }
      }
      let value = parseInt(firstNumber + lastNumber);
      count += value
    }

    console.log("Day 1 Part 1 Result: " + count);
  });
};

module.exports = part1;
