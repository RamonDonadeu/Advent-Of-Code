const fs = require("fs");
const path = require("path");
const parseData = require("./parseData");

const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = parseData(data);

    const result = data.reduce((acc, cur) => {
      const regex = /(\d+)/g
      const [number1, number2] = cur.match(regex)
      acc += number1 * number2
      return acc
    }, 0)

    console.log("Day 3 Part 1 Result: " + result);
  });
};



module.exports = part1;
