const fs = require("fs");
const path = require("path");
const factorial = require("../../helpers/factorial");

const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");

    let result = 0;
    for (let i = 0; i < data.length; i++) {
      let arrangements = 0;
      let mask = "." + data[i].split(" ")[0] + ".";
      let springs = data[i].split(" ")[1].split(",");
      // let options = [];
      let options = factorial(mask.replace(/[^?]/g, "").length);
      // for (let j = 0; j < springs.length; j++) {
      //   options.push(
      //     "." + new Array(parseInt(springs[j])).fill("#").join("") + "."
      //   );
      // }
      console.log(mask);
      console.log(options);
    }

    console.log("Day 12 Part 1 Result:");
  });
};

module.exports = part1;
