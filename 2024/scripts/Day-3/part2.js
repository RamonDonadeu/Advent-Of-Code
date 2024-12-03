const fs = require("fs");
const path = require("path");
const parseData = require("./parseData");
const parseDataPart2 = require("./parseDataPart2");

const part2 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = parseDataPart2(data);
    let enable = true;
    const result = data.reduce((acc, cur) => {
      if (cur === "do") {
        enable = true
      } else if (cur === "don't") {
        enable = false
      }
      else if (enable) {
        const regex = /(\d+)/g
        const [number1, number2] = cur.match(regex)
        acc += number1 * number2
      }

      return acc
    }, 0)

    console.log("Day 3 Part 2 Result: " + result);
  });
};

module.exports = part2;
