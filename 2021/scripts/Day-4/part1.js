const fs = require("fs");
const path = require("path");
const parseData = require("./parseData");

const part1 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const { order, bingos } = parseData(data);
    let gameFinished = false;
    let bingoWinner = -1;
    let nextValue;

    while (order.length > 0 && bingoWinner === -1) {
      nextValue = order.splice(0, 1);
      if (nextValue[0].length === 1) {
        nextValue[0] = " " + nextValue[0];
      }
      bingos.forEach((bingo, index) => {
        for (let rowIndex in bingo) {
          let row = bingo[rowIndex];
          bingo[rowIndex] = row.replace(nextValue + " ", " 0 ");
        }
        for (i = 0; i < 5; i++) {
          if (bingo[i] === " 0  0  0  0  0 ") {
            bingoWinner = index;
            break;
          }
        }
        for (i = 0; i < 5; i++) {
          if (
            bingo[0].substring(3 * i, 3 * i + 2) === " 0" &&
            bingo[1].substring(3 * i, 3 * i + 2) === " 0" &&
            bingo[2].substring(3 * i, 3 * i + 2) === " 0" &&
            bingo[3].substring(3 * i, 3 * i + 2) === " 0" &&
            bingo[4].substring(3 * i, 3 * i + 2) === " 0"
          ) {
            bingoWinner = index;
            break;
          }
        }
      });
    }
    bingoWinner = bingos[bingoWinner];
    let count = 0;
    for (let i = 0; i < 5; i++) {
      bingoWinner[i] = " " + bingoWinner[i];
      bingoWinner[i] = bingoWinner[i].replaceAll("  ", " ");
      const line = bingoWinner[i].split(" ");
      count =
        parseInt(line[1]) +
        parseInt(line[2]) +
        parseInt(line[3]) +
        parseInt(line[4]) +
        parseInt(line[5]) +
        count;
    }

    console.log("Day 4 Part 1 result: " + count * parseInt(nextValue));
  });
};

module.exports = part1;
