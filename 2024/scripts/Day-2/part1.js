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
    let result = 0
    data.forEach(report => {
      result += isAscending(report) || isDescending(report) ? 1 : 0
    })

    console.log("Day 2 Part 1 Result: " + result);
  });
};

const MAX_SPACE = 3
const MIN_SPACE = 1

function isAscending(reportArray) {
  for (let i = 0; i < reportArray.length - 1; i++) {
    if (reportArray[i + 1] - reportArray[i] < MIN_SPACE || reportArray[i + 1] - reportArray[i] > MAX_SPACE) {
      return false
    }
  }
  return true
}

function isDescending(reportArray) {
  for (let i = 0; i < reportArray.length - 1; i++) {
    if (reportArray[i] - reportArray[i + 1] < MIN_SPACE || reportArray[i] - reportArray[i + 1] > MAX_SPACE) {
      return false
    }
  }
  return true
}



module.exports = part1;
