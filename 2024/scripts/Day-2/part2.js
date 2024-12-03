const fs = require("fs");
const path = require("path");
const parseData = require("./parseData");

const part2 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = parseData(data);
    let result = 0
    data.forEach(report => {
      result += isAscending(report, 1) || isDescending(report, 1) ? 1 : 0
    })

    console.log("Day 2 Part 1 Result: " + result);
  });
};


const MAX_SPACE = 3
const MIN_SPACE = 1


function isAscending(reportArray, tolerance) {
  const copy = [...reportArray]
  console.log('ascend ' + reportArray)
  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i + 1] - copy[i] < MIN_SPACE || copy[i + 1] - copy[i] > MAX_SPACE) {
      if (tolerance) {
        const copyWithoutI = copy.slice(0, i).concat(copy.slice(i + 1));
        const copyWithoutIPlus1 = copy.slice(0, i + 1).concat(copy.slice(i + 2));
        return isAscending(copyWithoutI, tolerance - 1) || isAscending(copyWithoutIPlus1, tolerance - 1)
      } else {
        return false
      }
    }
  }
  console.log('Is safe')
  return true
}

function isDescending(reportArray, tolerance) {
  const copy = [...reportArray]
  console.log('descend ' + copy)
  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i] - copy[i + 1] < MIN_SPACE || copy[i] - copy[i + 1] > MAX_SPACE) {
      if (tolerance) {
        const copyWithoutI = copy.slice(0, i).concat(copy.slice(i + 1));
        const copyWithoutIPlus1 = copy.slice(0, i + 1).concat(copy.slice(i + 2));
        return isDescending(copyWithoutI, tolerance - 1) || isDescending(copyWithoutIPlus1, tolerance - 1);
      } else {
        return false
      }
    }
  }
  console.log('Is safe')
  return true
}



module.exports = part2;
