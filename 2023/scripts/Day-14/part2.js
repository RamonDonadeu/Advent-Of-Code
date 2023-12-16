const fs = require("fs");
const path = require("path");

const tilt = (map, direction, rocksPosition) => {
  let movementUp = 0;
  let movementLeft = 0;
  if (direction === "north") {
    rocksPosition.sort((a, b) => a.x - b.x);
    movementUp = -1;
  }
  if (direction === "south") {
    rocksPosition.sort((a, b) => b.x - a.x);
    movementUp = 1;
  }
  if (direction === "east") {
    rocksPosition.sort((a, b) => b.y - a.y);
    movementLeft = 1;
  }
  if (direction === "west") {
    rocksPosition.sort((a, b) => a.y - b.y);
    movementLeft = -1;
  }

  rocksPosition.forEach((rock) => {
    while (
      rock.x + movementUp >= 0 &&
      rock.x + movementUp < map.length &&
      rock.y + movementLeft >= 0 &&
      rock.y + movementLeft < map[0].length &&
      map[rock.x + movementUp][rock.y + movementLeft] === "."
    ) {
      map[rock.x + movementUp][rock.y + movementLeft] = "O";
      map[rock.x][rock.y] = ".";
      rock.x += movementUp;
      rock.y += movementLeft;
    }
  });
};
let mapSerizalized = [];
const findRepeatedCycle = (map) => {
  let serialized = "";
  for (let i = 0; i < map.length; i++) {
    serialized += map[i].join("");
  }
  const index = mapSerizalized.findIndex((item) => item === serialized);
  mapSerizalized.push(serialized);
  return index;
};

const part2 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let rocksPosition = [];
    let map = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === "O") {
          rocksPosition.push({ x: i, y: j });
        }
      }
      map.push(data[i].split(""));
    }

    let result = 0;
    const cycles = 1000000000;
    let cycleEndsAtIndex = 0;
    let cycleStartAtIndex = 0;
    for (let i = 0; i < cycles; i++) {
      // Move north
      tilt(map, "north", rocksPosition);
      tilt(map, "west", rocksPosition);
      tilt(map, "south", rocksPosition);
      tilt(map, "east", rocksPosition);
      let index = findRepeatedCycle(map);
      if (index !== -1) {
        cycleEndsAtIndex = i;
        cycleStartAtIndex = index;
        break;
      }
    }
    let cycleLength = cycleEndsAtIndex - cycleStartAtIndex;
    let remainingCycles = ((cycles - cycleEndsAtIndex) % cycleLength) -1;
    for (let i = 0; i < remainingCycles; i++) {
      // Move north
      tilt(map, "north", rocksPosition);
      tilt(map, "west", rocksPosition);
      tilt(map, "south", rocksPosition);
      tilt(map, "east", rocksPosition);
    }
    let mapToPrint = [];
    rocksPosition.forEach((rock) => {
      result += map.length - rock.x;
    });
    console.log("====================================");
    mapToPrint = [];
    if (visualize) {
      for (let i = 0; i < map.length; i++) {
        mapToPrint.push(map[i].join(""));
      }
      console.log(mapToPrint.join("\n"));
    }

    console.log("Day 14 Part 2 Result: ", result);
  });
};

module.exports = part2;
