const fs = require("fs");
const path = require("path");

const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let sequence = data.split(",");
    let currentValue = 0;
    let listOfSequenceResults = [];
    sequence.forEach((item, index) => {
      currentValue = 0;
      for (let i = 0; i < item.length; i++) {
        currentValue = ((currentValue + item.charCodeAt(i)) * 17) % 256;
      }

      listOfSequenceResults.push(currentValue);
    });

    console.log(listOfSequenceResults);

    console.log(
      "Day 15 Part 1 Result: ",
      listOfSequenceResults.reduce((partialSum, a) => partialSum + a, 0)
    );
  });
};

module.exports = part1;
