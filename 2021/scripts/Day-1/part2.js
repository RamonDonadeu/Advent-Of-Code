const fs = require("fs");
const path = require("path");

const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  const data = [];
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let previousDepth =
      parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]);
    let nOfDecrements = 0;

    for (i = 1; i < data.length - 2; i++) {
      const depth =
        parseInt(data[i]) + parseInt(data[i + 1]) + parseInt(data[i + 2]);
      if (depth > previousDepth) {
        nOfDecrements++;
      }
      previousDepth = depth;
    }

    console.log("Part 2 result: " + nOfDecrements + " decrements");
  });
};

module.exports = part2;
