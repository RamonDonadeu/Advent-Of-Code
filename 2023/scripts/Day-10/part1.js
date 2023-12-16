const fs = require("fs");
const path = require("path");
const printMap = async (map) => {
  console.clear();
  const newMap = [];
  for (let i = 0; i < map.length; i++) {
    let line = "";
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "*") {
        line += "*";
      } else {
        line += " ";
      }
    }
    newMap.push(line);
  }
  console.log(newMap.join("\n"));
};
const part1 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let map = data.split("\n");
    const animal = { x: 0, y: 0 };

    const path1 = { x: animal.x, y: animal.y };
    const path2 = { x: animal.x, y: animal.y };

    // Find S
    for (let i = 0; i < map.length; i++) {
      if (map[i].includes("S")) {
        animal.x = i;
        animal.y = map[i].indexOf("S");
        let fromLeft = false;
        let fromRight = false;
        let fromTop = false;
        let fromBottom = false;
        if (
          i > 0 &&
          (map[i - 1][animal.y] === "|" ||
            map[i - 1][animal.y] === "7" ||
            map[i - 1][animal.y] === "F")
        ) {
          fromTop = true;
        }
        if (
          i < map.length - 1 &&
          (map[i + 1][animal.y] === "|" ||
            map[i + 1][animal.y] === "J" ||
            map[i + 1][animal.y] === "L")
        ) {
          fromBottom = true;
        }
        if (
          animal.y > 0 &&
          (map[i][animal.y - 1] === "-" ||
            map[i][animal.y - 1] === "L" ||
            map[i][animal.y - 1] === "F")
        ) {
          fromLeft = true;
        }
        if (
          animal.y < map[i].length - 1 &&
          (map[i][animal.y + 1] === "-" ||
            map[i][animal.y + 1] === "J" ||
            map[i][animal.y + 1] === "7")
        ) {
          fromRight = true;
        }

        map[i] = map[i].split("");
        if (fromTop) {
          if (fromLeft) {
            map[i][animal.y] = "*";
            path1.x = i - 1;
            path1.y = animal.y;
            path2.x = animal.x;
            path2.y = animal.y - 1;
          }
          if (fromRight) {
            map[i][animal.y] = "*";
            path1.x = i - 1;
            path1.y = animal.y;
            path2.x = animal.x;
            path2.y = animal.y + 1;
          }
        }
        if (fromBottom) {
          if (fromLeft) {
            map[i][animal.y] = "*";
            path1.x = i + 1;
            path1.y = animal.y;
            path2.x = animal.x;
            path2.y = animal.y - 1;
          }
          if (fromRight) {
            map[i][animal.y] = "*";
            path1.x = i + 1;
            path1.y = animal.y;
            path2.x = animal.x;
            path2.y = animal.y + 1;
          }
        }
      } else {
        map[i] = map[i].split("");
      }
    }

    let steps = 0;
    const paths = [path1, path2];
    while (path1.x !== path2.x || path1.y !== path2.y) {
      paths.forEach((path, index) => {
        if (map[path.x][path.y] === "-") {
          if (map[path.x][path.y - 1] !== "*") {
            map[path.x][path.y] = "*";
            path.y--;
          } else {
            map[path.x][path.y] = "*";
            path.y++;
          }
          return;
        }
        if (map[path.x][path.y] === "|") {
          if (map[path.x - 1][path.y] !== "*") {
            map[path.x][path.y] = "*";
            path.x--;
          } else {
            map[path.x][path.y] = "*";
            path.x++;
          }
          return;
        }
        if (map[path.x][path.y] === "7") {
          if (map[path.x][path.y - 1] !== "*") {
            map[path.x][path.y] = "*";
            path.y--;
          } else {
            map[path.x][path.y] = "*";
            path.x++;
          }
          return;
        }
        if (map[path.x][path.y] === "J") {
          if (map[path.x][path.y - 1] !== "*") {
            map[path.x][path.y] = "*";
            path.y--;
          } else {
            map[path.x][path.y] = "*";
            path.x--;
          }
          return;
        }
        if (map[path.x][path.y] === "L") {
          if (map[path.x][path.y + 1] !== "*") {
            map[path.x][path.y] = "*";
            path.y++;
          } else {
            map[path.x][path.y] = "*";
            path.x--;
          }
          return;
        }
        if (map[path.x][path.y] === "F") {
          if (map[path.x][path.y + 1] !== "*") {
            map[path.x][path.y] = "*";
            path.y++;
          } else {
            map[path.x][path.y] = "*";
            path.x++;
          }
          return;
        }
        paths[index] = { x: path.x, y: path.y };
      });
      steps++;

      if (visualize) {
        await printMap(map);
      }
    }

    console.log("Day 10 Part 1 Result: ", steps + 1);
  });
};

module.exports = part1;
