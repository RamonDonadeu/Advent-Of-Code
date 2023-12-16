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
    const lastValues = [];
    for (let i = 0; i < data.length; i++) {
      const serie = data[i].split(" ").map(Number);
      console.log(serie);
      const steps = [];
      steps.push(serie);
      while (!steps[steps.length - 1].every((item) => item === 0)) {
        let serieToIterate = steps[steps.length - 1];
        let newSerie = [];
        for (let j = 0; j < serieToIterate.length - 1; j++) {
          newSerie.push(serieToIterate[j + 1] - serieToIterate[j]);
        }
        steps.push(newSerie);
      }
      steps[steps.length - 1].push(0);
      for (let j = steps.length - 2; j >= 0; j--) {
        steps[j].push(
          steps[j][steps[j].length - 1] + steps[j + 1][steps[j].length - 1]
        );
      }
      lastValues.push(steps[0][steps[0].length - 1]);
    }
    console.log(
      "Day 9 Part 1 Result: " +
        lastValues.reduce((partialSum, a) => partialSum + a, 0)
    );
  });
};

module.exports = part1;
