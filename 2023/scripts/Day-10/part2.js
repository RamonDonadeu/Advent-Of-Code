const fs = require("fs");
const path = require("path");
const part2 = () => {
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

    const allPoints = [[], []];

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
    // OBENER TODOS LOS PUNTOS DEL RECORRIDO Y HACER EL SHOELACE FORMULA
    allPoints[0].push([animal.x, animal.y]);
    allPoints[1].push([animal.x, animal.y]);
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
          allPoints[index].push([path.x, path.y]);
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
          allPoints[index].push([path.x, path.y]);
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
          allPoints[index].push([path.x, path.y]);
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
          allPoints[index].push([path.x, path.y]);
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
          allPoints[index].push([path.x, path.y]);
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
          allPoints[index].push([path.x, path.y]);
          return;
        }
        paths[index] = { x: path.x, y: path.y };
      });
      steps++;
    }
    map[path1.x][path1.y] = "*";
    let tilesToVisit = [];
    for (let j = 0; j < map[0].length; j++) {
      if (map[0][j] !== "*") {
        tilesToVisit.push("0, " + j);
        map[0][j] = "A";
      }
    }
    for (let j = 0; j < map[0].length; j++) {
      if (map[map.length - 1][j] !== "*") {
        tilesToVisit.push(map.length - 1 + ", " + j);
        map[map.length - 1][j] = "A";
      }
    }
    for (let i = 1; i < map.length - 1; i++) {
      if (map[i][0] !== "*") {
        tilesToVisit.push(i + ", 0");
        map[i][0] = "A";
      }
    }
    for (let i = 1; i < map.length - 1; i++) {
      if (map[i][map[i].length - 1] !== "*") {
        tilesToVisit.push(i + ", " + (map[i].length - 1));
        map[i][map[i].length - 1] = "A";
      }
    }
    // for (let i = 0; i < tilesToVisit.length; i++) {
    //   const tile = {
    //     x: parseInt(tilesToVisit[i].split(", ")[0]),
    //     y: parseInt(tilesToVisit[i].split(", ")[1]),
    //   };
    //   if (
    //     tile.x > 0 &&
    //     map[tile.x - 1][tile.y] !== "*" &&
    //     map[tile.x - 1][tile.y] !== "A"
    //   ) {
    //     if (
    //       tile.x > 0 &&
    //       map[tile.x - 1][tile.y] !== "*" &&
    //       map[tile.x - 1][tile.y] !== "A" &&
    //       !tilesToVisit.includes(tile.x - 1 + ", " + tile.y)
    //     ) {
    //       tilesToVisit.push(tile.x - 1 + ", " + tile.y);
    //       map[tile.x][tile.y] = "A";
    //     }
    //     if (
    //       tile.x < map.length - 1 &&
    //       map[tile.x + 1][tile.y] !== "*" &&
    //       map[tile.x + 1][tile.y] !== "A" &&
    //       !tilesToVisit.includes(tile.x + 1 + ", " + tile.y)
    //     ) {
    //       tilesToVisit.push(tile.x + 1 + ", " + tile.y);
    //       map[tile.x][tile.y] = "A";
    //     }
    //     if (
    //       tile.y > 0 &&
    //       map[tile.x][tile.y - 1] !== "*" &&
    //       map[tile.x][tile.y - 1] !== "A" &&
    //       !tilesToVisit.includes(tile.x + ", " + (tile.y - 1))
    //     ) {
    //       tilesToVisit.push(tile.x + ", " + (tile.y - 1));
    //       map[tile.x][tile.y] = "A";
    //     }
    //     if (
    //       tile.y < map[tile.x].length - 1 &&
    //       map[tile.x][tile.y + 1] !== "*" &&
    //       map[tile.x][tile.y + 1] !== "A" &&
    //       !tilesToVisit.includes(tile.x + ", " + (tile.y + 1))
    //     ) {
    //       tilesToVisit.push(tile.x + ", " + (tile.y + 1));
    //       map[tile.x][tile.y] = "A";
    //     }
    //   }
    // }
    // SHOLACE FORMULA WITH allPoints

    let sum = 0;
    for (let i = 0; i < allPoints[0].length - 1; i++) {
      sum +=
        allPoints[0][i][0] * allPoints[0][i + 1][1] -
        allPoints[0][i + 1][0] * allPoints[0][i][1];
    }
    sum +=
      allPoints[0][allPoints[0].length - 1][0] *
        allPoints[1][allPoints[1].length - 1][1] -
      allPoints[1][allPoints[1].length - 1][0] *
        allPoints[0][allPoints[0].length - 1][1];
    for (let i = allPoints[1].length - 1; i > 1; i--) {
      sum +=
        allPoints[1][i][0] * allPoints[1][i - 1][1] -
        allPoints[1][i - 1][0] * allPoints[1][i][1];
    }
    const a = (1 / 2) * Math.abs(sum);
    const b = steps * 2 + 2;
    const i = a - b / 2 ;
    console.log(a, b, i)
    console.log("Day 10 Part 2 Result: " + i);
  });
};

module.exports = part2;
