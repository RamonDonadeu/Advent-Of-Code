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
    let auxMap = [];
    let emptyColumns = [];
    let emptyRows = [];
    for (let i = 0; i < data.length; i++) {
      if (!data[i].includes("#")) {
        emptyRows.push(i);
      }

      auxMap.push(data[i].split(""));
    }
    for (let i = 0; i < auxMap[0].length; i++) {
      let hasGalaxy = false;
      for (let j = 0; j < auxMap.length; j++) {
        if (auxMap[j][i] === "#") {
          hasGalaxy = true;
          break;
        }
      }
      if (!hasGalaxy) {
        emptyColumns.push(i);
      }
    }
    if (visualize) {
      console.log(data.join("\n"));
      console.log("==============");
      for (let i = 0; i < auxMap.length; i++) {
        console.log(auxMap[i].join(""));
      }
    }
    const olderDistance = 1;
    const allGalaxyes = [];
    for (let i = 0; i < auxMap.length; i++) {
      for (let j = 0; j < auxMap[i].length; j++) {
        if (auxMap[i][j] === "#") {
          allGalaxyes.push({ x: i, y: j });
        }
      }
    }
    let galaxiesDistance = 0;
    let count = 0;
    for (let i = 0; i < allGalaxyes.length; i++) {
      for (let j = i + 1; j < allGalaxyes.length; j++) {
        count++;
        let emptyRowsPassed = emptyRows.filter(
          (row) =>
            (row > allGalaxyes[i].x && row < allGalaxyes[j].x) ||
            (row < allGalaxyes[i].x && row > allGalaxyes[j].x)
        ).length;
        let emptiyColumnsPassed = emptyColumns.filter(
          (column) =>
            (column > allGalaxyes[i].y && column < allGalaxyes[j].y) ||
            (column < allGalaxyes[i].y && column > allGalaxyes[j].y)
        ).length;

        let distance =
          Math.abs(allGalaxyes[i].x - allGalaxyes[j].x) + 
          olderDistance * emptiyColumnsPassed +
          Math.abs(allGalaxyes[i].y - allGalaxyes[j].y) +
          olderDistance * emptyRowsPassed;
        if (visualize) {
          console.log(
            "Galaxies: ",
            i + 1,
            allGalaxyes[i],
            j + 1,
            allGalaxyes[j],
            "Distance: ",
            distance
          );
        }
        galaxiesDistance += distance;
      }
    }
    console.log("Day 11 Part 1 Result: ", galaxiesDistance);
  });
};

module.exports = part1;
