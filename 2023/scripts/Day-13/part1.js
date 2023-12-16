const fs = require("fs");
const path = require("path");

const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let listOfMaps = [];
    let auxMap = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "") {
        listOfMaps.push(auxMap);

        auxMap = [];
      } else {
        auxMap.push(data[i].split(""));
      }
    }

    listOfMaps.push(auxMap);
    let result = 0;
    listOfMaps.forEach((map) => {
      let hasReflection = false;
      let mapReflection = { x: 0, y: 0 };
      // Check vertically
      for (let i = 0; i < map[0].length - 1 && !hasReflection; i++) {
        hasReflection = true;
        for (let j = 0; j < map.length; j++) {
          if (map[j][i] !== map[j][i + 1]) {
            hasReflection = false;
            break;
          }
        }
        if (hasReflection) {
          let isTrueReflection = true;
          for (let k = 0; k <= i && i + k + 1 < map[0].length; k++) {
            for (let j = 0; j < map.length; j++) {
              if (map[j][i - k] !== map[j][i + k + 1]) {
                isTrueReflection = false;
                break;
              }
            }
            if (!isTrueReflection) {
              break;
            }
          }
          if (isTrueReflection) {
            result += i + 1;
            return;
          } else {
            hasReflection = false;
          }
        }
      }
      // Check horizontally
      hasReflection = false;
      for (let i = 0; i < map.length - 1 && !hasReflection; i++) {
        hasReflection = true;
        for (let j = 0; j < map[0].length; j++) {
          if (map[i][j] !== map[i + 1][j]) {
            hasReflection = false;
            break;
          }
        }
        if (hasReflection) {
          let isTrueReflection = true;
          for (let k = 0; k <= i && i + k + 1 < map.length; k++) {
            for (let j = 0; j < map[0].length; j++) {
              if (map[i - k][j] !== map[i + k + 1][j]) {
                isTrueReflection = false;
                break;
              }
            }
            if (!isTrueReflection) {
              break;
            }
          }
          if (isTrueReflection) {
            result += (i + 1) * 100;
            return;
          } else {
            hasReflection = false;
          }
        }
      }
    });

    console.log("Day 13 Part 1 Result: ", result);
  });
};

module.exports = part1;
