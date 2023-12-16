const fs = require("fs");
const path = require("path");

const mirrors = ["/", "\\", "|", "-"];
const map = [];
let listOfBeams = [{ x: -1, y: 0, direction: "right" }];
const listOfReflections = [];
const energiziedMirrors = [];

let newListOfBeams = [];
let mapStates = [];

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const visualizeFunction = async () => {
  await sleep(10);
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

const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data.split("\n").forEach((row, y) => {
      map.push([]);
      row.split("").forEach((cell, x) => {
        map[y].push(cell);
      });
    });
    let cycleMargin = 0;
    while (listOfBeams.length > 0) {
      if (visualize) {
        await visualizeFunction();
      }
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
    console.log(
      "Number of # characters in the map:",
      count + energiziedMirrors.length
    );
  });
};

module.exports = part1;
