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

    console.log(data);

    console.log("Day X Part 2 Result:");
  });
};

module.exports = part2;
