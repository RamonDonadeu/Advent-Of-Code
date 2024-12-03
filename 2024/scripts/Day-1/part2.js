const fs = require("fs");
const path = require("path");
const part2 = (visualize) => {
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
    const leftAppearance = {}
    leftRow.forEach((value) => {
      if (leftAppearance[value]) {
        leftAppearance[value]++
      } else {
        leftAppearance[value] = 1
      }
    })
    let result = 0
    rightRow.forEach((value) => {
      if (leftAppearance[value]) {
        result += leftAppearance[value] * value
      }
    })
    console.log("Day 1 Part 2 Result: " + result);
  });
};


const parseData = (data, leftRow, rightRow) => {
  data.forEach((line) => {
    const [left, right] = line.split("   ");
    leftRow.push(parseInt(left));
    rightRow.push(parseInt(right));
  })
};

module.exports = part2;
