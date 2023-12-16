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
    rocksPosition.sort((a, b) => a.y - b.y);
    movementLeft = 1;
  }
  if (direction === "west") {
    rocksPosition.sort((a, b) => b.y - a.y);
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

const part1 = (visualize) => {
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
    // Move north
    tilt(map, "north", rocksPosition);
    rocksPosition.forEach((rock) => {
      result += map.length - rock.x;
    });

    if (visualize) {
      for (let i = 0; i < map.length; i++) {
        map[i] = map[i].join("");
      }
      console.log(map.join("\n"));
    }

    console.log("Day 14 Part 1 Result: ", result);
  });
};

module.exports = part1;
