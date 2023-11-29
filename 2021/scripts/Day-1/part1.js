const fs = require("fs");

const path = require("path");

const part1 = async () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let previousDepth = parseInt(data[0]);
    let nOfDecrements = 0;

    for (i = 1; i < data.length; i++) {
      const depth = parseInt(data[i]);
      if (depth > previousDepth) {
        nOfDecrements++;
      }
      previousDepth = depth;
    }

    console.log("Part 1 result: " + nOfDecrements + " decrements");
  });
};

module.exports = part1;
