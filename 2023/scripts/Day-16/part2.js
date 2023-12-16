const fs = require("fs");
const path = require("path");

const mirrors = ["/", "\\", "|", "-"];
let map = [];
let listOfBeams = [{ x: -1, y: 0, direction: "right" }];
let listOfReflections = [];
let energiziedMirrors = [];

let newListOfBeams = [];

const visualizeFunction = () => {
  let result = "";
  map.forEach((row) => {
    row.forEach((cell) => {
      result += cell;
    });
    result += "\n";
  });
  console.log(result);
};
const moveBeam = (beam) => {
  if (beam.direction === "right") {
    if (beam.x + 1 >= map[0].length) {
      return false;
    }
    if (!mirrors.includes(map[beam.y][beam.x + 1])) {
      beam.x += 1;
      map[beam.y][beam.x] = "#";
      return true;
    } else {
      if (map[beam.y][beam.x + 1] === "/") {
        beam.x += 1;
        beam.direction = "up";
      } else if (map[beam.y][beam.x + 1] === "\\") {
        beam.x += 1;
        beam.direction = "down";
      } else if (map[beam.y][beam.x + 1] === "|") {
        beam.x += 1;
        beam.direction = "up";
        let newBeam = { ...beam };
        newBeam.direction = "down";
        newListOfBeams.push(newBeam);
      } else if (map[beam.y][beam.x + 1] === "-") {
        beam.x += 1;
      }
      if (!energiziedMirrors.includes("" + beam.x + "-" + beam.y)) {
        energiziedMirrors.push("" + beam.x + "-" + beam.y);
      }
      if (
        !listOfReflections.includes("" + beam.x + "-" + beam.y + beam.direction)
      ) {
        listOfReflections.push("" + beam.x + "-" + beam.y + beam.direction);
        return true;
      } else {
        return false;
      }
    }
  }
  if (beam.direction === "left") {
    if (beam.x - 1 < 0) {
      return false;
    }
    if (!mirrors.includes(map[beam.y][beam.x - 1])) {
      beam.x -= 1;
      map[beam.y][beam.x] = "#";
      return true;
    } else {
      if (map[beam.y][beam.x - 1] === "/") {
        beam.x -= 1;
        beam.direction = "down";
      } else if (map[beam.y][beam.x - 1] === "\\") {
        beam.x -= 1;
        beam.direction = "up";
      } else if (map[beam.y][beam.x - 1] === "|") {
        beam.x -= 1;
        beam.direction = "up";
        let newBeam = { ...beam };
        newBeam.direction = "down";
        newListOfBeams.push(newBeam);
      } else if (map[beam.y][beam.x - 1] === "-") {
        beam.x -= 1;
      }
      if (!energiziedMirrors.includes("" + beam.x + "-" + beam.y)) {
        energiziedMirrors.push("" + beam.x + "-" + beam.y);
      }
      if (
        !listOfReflections.includes("" + beam.x + "-" + beam.y + beam.direction)
      ) {
        listOfReflections.push("" + beam.x + "-" + beam.y + beam.direction);
        return true;
      } else {
        return false;
      }
    }
  }
  if (beam.direction === "up") {
    if (beam.y - 1 < 0) {
      return false;
    }
    if (!mirrors.includes(map[beam.y - 1][beam.x])) {
      beam.y -= 1;
      map[beam.y][beam.x] = "#";
      return true;
    } else {
      if (map[beam.y - 1][beam.x] === "/") {
        beam.y -= 1;
        beam.direction = "right";
      } else if (map[beam.y - 1][beam.x] === "\\") {
        beam.y -= 1;
        beam.direction = "left";
      } else if (map[beam.y - 1][beam.x] === "|") {
        beam.y -= 1;
      } else if (map[beam.y - 1][beam.x] === "-") {
        beam.y -= 1;
        beam.direction = "left";
        let newBeam = { ...beam };
        newBeam.direction = "right";
        newListOfBeams.push(newBeam);
      }
      if (!energiziedMirrors.includes("" + beam.x + "-" + beam.y)) {
        energiziedMirrors.push("" + beam.x + "-" + beam.y);
      }
      if (
        !listOfReflections.includes("" + beam.x + "-" + beam.y + beam.direction)
      ) {
        listOfReflections.push("" + beam.x + "-" + beam.y + beam.direction);
        return true;
      } else {
        return false;
      }
    }
  }
  if (beam.direction === "down") {
    if (beam.y + 1 >= map.length) {
      return false;
    }
    if (!mirrors.includes(map[beam.y + 1][beam.x])) {
      beam.y += 1;
      map[beam.y][beam.x] = "#";
      return true;
    } else {
      if (map[beam.y + 1][beam.x] === "/") {
        beam.y += 1;
        beam.direction = "left";
      } else if (map[beam.y + 1][beam.x] === "\\") {
        beam.y += 1;
        beam.direction = "right";
      } else if (map[beam.y + 1][beam.x] === "|") {
        beam.y += 1;
      } else if (map[beam.y + 1][beam.x] === "-") {
        beam.y += 1;
        beam.direction = "right";
        let newBeam = { ...beam };
        newBeam.direction = "left";
        newListOfBeams.push(newBeam);
      }
      if (!energiziedMirrors.includes("" + beam.x + "-" + beam.y)) {
        energiziedMirrors.push("" + beam.x + "-" + beam.y);
      }
      if (
        !listOfReflections.includes("" + beam.x + "-" + beam.y + beam.direction)
      ) {
        listOfReflections.push("" + beam.x + "-" + beam.y + beam.direction);
        return true;
      } else {
        return false;
      }
    }
  }
  return true;
};

const part2 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let cleanMap = [];

    data.split("\n").forEach((row, y) => {
      cleanMap.push([]);
      row.split("").forEach((cell, x) => {
        cleanMap[y].push(cell);
      });
    });
    let possibleStarts = [];

    for (let i = 0; i < cleanMap[0].length; i++) {
      possibleStarts.push({ x: -1, y: i, direction: "right" });
      possibleStarts.push({ x: cleanMap[0].length, y: i, direction: "left" });
    }
    for (let i = 0; i < cleanMap.length; i++) {
      possibleStarts.push({ x: i, y: -1, direction: "down" });
      possibleStarts.push({ x: i, y: cleanMap.length, direction: "up" });
    }
    let mostEnergized = 0;
    possibleStarts.forEach((startingBeam) => {
      map = cleanMap.map((row) => [...row]);
      listOfBeams = [{ ...startingBeam }];
      listOfReflections = [];
      energiziedMirrors = [];
      newListOfBeams = [];
      while (listOfBeams.length > 0) {
        newListOfBeams = [];
        listOfBeams.forEach((beam) => {
          if (moveBeam(beam)) {
            newListOfBeams.push(beam);
          }
        });
        listOfBeams = newListOfBeams;
      }

      let count = 0;
      map.forEach((row) => {
        row.forEach((cell) => {
          if (cell === "#") {
            count++;
          }
        });
      });
      if (count + energiziedMirrors.length > mostEnergized) {
        mostEnergized = count + energiziedMirrors.length;
        if (visualize) {
          visualizeFunction();
          console.log(startingBeam);
        }
      }
    });
    console.log("Number of # characters in the map:", mostEnergized);
  });
};

module.exports = part2;
