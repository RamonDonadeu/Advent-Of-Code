const fs = require("fs");
const path = require("path");
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    const maxBlue = 14;
    const maxGreen = 13;
    const maxRed = 12;
    const possibleGames = [];
    let power = 0
    let gameSum = 0
    let fewer = {}
    for (let i = 0; i < data.length; i++) {
      const line = data[i].replace('\r', '');
      const game = line.split(':')[0].split(' ')[1]
      const sets = line.split(': ')[1].split('; ');
      let possible = true
      fewer = { blue: -1, green: -1, red: -1 }
      for (let j = 0; j < sets.length; j++) {
        const counter = { blue: 0, green: 0, red: 0 }
        const set = sets[j];
        const cubes = set.split(', ');
        for (let k = 0; k < cubes.length; k++) {
          const cube = cubes[k];
          const color = cube.split(' ')[1];
          const number = cube.split(' ')[0];
          counter[color] += parseInt(number);
          if(fewer[color] < parseInt(number) || fewer[color] === -1) {
            fewer[color] = parseInt(number)
          }
        }
        if (counter.blue > maxBlue || counter.green > maxGreen || counter.red > maxRed) {
          possible = false
        }
      }
      
      if (possible) {
        possibleGames.push(game)
        gameSum += parseInt(game)
      }
      power += fewer.blue * fewer.green * fewer.red
    }
    console.log("Day 2 Part 2 Result: " + power);  });
};

module.exports = part2;
