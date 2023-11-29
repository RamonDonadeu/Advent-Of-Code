const fs = require("fs");
const path = require("path");
const squareOf = require("../../helpers/squareOf");
const findMostCommon = require("./findMostCommon");
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let counts = Array(data[0].length).fill(0); // Initialize counts array with 0s
    let gammaRate = 0;
    let epsilonRate = 0;
    counts = findMostCommon(data);
    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > data.length / 2) {
        gammaRate += 1 * squareOf(2, counts.length - i - 1);
        epsilonRate += 0 * squareOf(2, counts.length - i - 1);
      } else {
        gammaRate += 0 * squareOf(2, counts.length - i - 1);
        epsilonRate += 1 * squareOf(2, counts.length - i - 1);
      }
    }
    console.log("GammaRate: " + gammaRate + ", EpsilonRate: " + epsilonRate);
    console.log("Day 3 Part 1 Result: " + gammaRate * epsilonRate);
  });
};

module.exports = part2;
