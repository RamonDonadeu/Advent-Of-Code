const fs = require("fs");
const path = require("path");

const part1 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");

    const pathing = data.splice(0, 1)[0];
    data.splice(0, 1);
    const directions = {};
    // PARSE
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      directions[line.split(" = ")[0]] = {
        L: line.split(" = ")[1].split(",")[0].split("(")[1],
        R: line.split(" = ")[1].split(", ")[1].split(")")[0],
      };
    }
    
    let nextStep = 0
    let actualPosition = 'AAA'
    let stepCounter = 0
    while (actualPosition !== 'ZZZ') {
      if (nextStep >= pathing.length) {
        nextStep = 0
      }
      actualPosition = directions[actualPosition][pathing[nextStep]]
      stepCounter++
      nextStep++
    }

    console.log("Day 8 Part 1 Result: " + stepCounter);
  });
};

module.exports = part1;
