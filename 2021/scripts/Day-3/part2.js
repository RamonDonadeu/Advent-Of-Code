const fs = require("fs");
const path = require("path");
const squareOf = require("../../helpers/squareOf");
const findMostCommon = require("./findMostCommon");
const binaryToInteger = require("../../helpers/binaryToInteger");
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let oxygenRate = 0;
    let CO2Rate = 0;
    let oxygenList = data;
    let CO2List = data;
    for (i = 0; oxygenList.length !== 1 || CO2List.length !== 1; i++) {
      if (oxygenList.length !== 1) {
        let counts = findMostCommon(oxygenList);
        const mostCommon = counts[i] >= oxygenList.length / 2 ? 1 : 0;
        let auxList = [];
        for (let j = 0; j < oxygenList.length; j++) {
          if (parseInt(oxygenList[j].split("")[i]) === mostCommon) {
            auxList.push(oxygenList[j]);
          }
        }
        oxygenList = auxList;
      }
      if (CO2List.length !== 1) {
        let counts = findMostCommon(CO2List);
        const mostCommon = counts[i] >= CO2List.length / 2 ? 0 : 1;
        let auxList = [];
        for (let j = 0; j < CO2List.length; j++) {
          if (parseInt(CO2List[j].split("")[i]) === mostCommon) {
            auxList.push(CO2List[j]);
          }
        }
        CO2List = auxList;
      }
    }
    oxygenRate = binaryToInteger(oxygenList[0]);
    CO2Rate = binaryToInteger(CO2List[0]);

    console.log("OxygenRate: " + oxygenRate + ", CO2Rate: " + CO2Rate);
    console.log("Day 3 Part 2 Result: " + oxygenRate * CO2Rate);
  });
};

module.exports = part2;
