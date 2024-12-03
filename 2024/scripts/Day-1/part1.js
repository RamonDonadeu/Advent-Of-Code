const fs = require("fs");
const path = require("path");

const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {

    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");

    const leftRow = []
    const rightRow = []
    data = parseData(data, leftRow, rightRow);
    leftRow.sort((a, b) => a - b);
    rightRow.sort((a, b) => a - b);
    let distances = 0
    leftRow.forEach((left, index) => {

      distances += Math.abs(leftRow[index] - rightRow[index])
    })

    console.log("Day 1 Part 1 Result: " + distances);
  });
};

const parseData = (data, leftRow, rightRow) => {
  data.forEach((line) => {
    const [left, right] = line.split("   ");
    leftRow.push(parseInt(left));
    rightRow.push(parseInt(right));
  })
};

module.exports = part1;
