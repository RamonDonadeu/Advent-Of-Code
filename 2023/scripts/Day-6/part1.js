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

    const times = data[0].split("Time: ")[1].match(/\d+/g).map(Number);
    const distances = data[1].split("Distance: ")[1].match(/\d+/g).map(Number);
    let lowestWinningTime = 0;
    let highestWinningTime = 0;
    let result = 1;
    for (i = 0; i < times.length; i++) {
      const time = times[i];
      const distance = distances[i];
      for (j = 0; j < time; j++) {
        const speed = j;
        const timeToTravel = time - j;
        if (speed * timeToTravel > distance) {
          lowestWinningTime = j;
          break;
        }
      }
      for (j = time; j > 0; j--) {
        const speed = j;
        const timeToTravel = time - j;
        if (speed * timeToTravel > distance) {
          highestWinningTime = j;
          break;
        }
      }
      result = result * (highestWinningTime - lowestWinningTime + 1);
    }
    console.log("Day 6 Part 1 Result: ", result);
  });
};

module.exports = part1;
