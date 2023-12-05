const fs = require("fs");
const path = require("path");


const gears = {}

const storeGear = (i, j, data) => {
  if(gears[i + ',' + j] === undefined) {
    gears[i + ',' + j] = {numbers:  []}
  }
  gears[i + ',' + j].numbers.push(data)
}
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
    }
  data = data.split("\r\n");
    let counter = 0
    let coordOfGear = { i: 0, j: 0 }
    let isGear = false
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] >= '0' && data[i][j] <= '9') {
        isGear = false
        coordOfGear.i = 0
        coordOfGear.j = 0
        let isPart = false
        let currentNumber = []
        // Look arround the numbers if it has a character that isn't a . or a number
        // FIRST LOOK AT LEFT OF THE NUMBER i-1 to i+1 j-1
        for (let k = i - 1; k <= i + 1; k++) {
          if (k < data.length && k >= 0) {
              if(j-1 >= 0 && (data[k][j-1] < '0' || data[k][j-1] > '9') && data[k][j-1] !== '.') {
                isPart = true
                if (data[k][j - 1] === '*') {
                  coordOfGear.i = k
                  coordOfGear.j = j - 1
                  isGear = true
                }
              }
          }
        }
        while(data[i][j] >= '0' && data[i][j] <= '9') {
          // THEN LOOK AT TOP AND BOTTOM OF THE NUMBER i-1 to i+1 j
          for (let k = i - 1; k <= i + 1
            ; k++) {
           if(k < data.length && k >= 0){
              if ((data[k][j] < '0' || data[k][j] > '9') && data[k][j] !== '.') {
                isPart = true
                if (data[k][j] === '*') {
                  coordOfGear.i = k
                  coordOfGear.j = j
                  isGear = true
                }
              }
            }
          }
          currentNumber.push(data[i][j])
          j++
        }
        j--
        // THEN LOOK AT RIGHT OF THE NUMBER i-1 to i+1 j+1
        for (let k = i - 1; k <= i + 1; k++) {
          if (k < data.length && k >= 0) {
            if (j+1 >= 0 && (data[k][j+1] < '0' || data[k][j+1] > '9') && data[k][j+1] !== '.') {
              isPart = true
              if (data[k][j + 1] === '*') {
                coordOfGear.i = k
                coordOfGear.j = j + 1
                isGear = true
              }
            }
          }
        }
        if (isPart) {
          if(isGear) {
            storeGear(coordOfGear.i, coordOfGear.j, parseInt(currentNumber.join('')))
          }
        }
      }
    }
    }
    
    Object.keys(gears).forEach(gearId => {
      if (gears[gearId].numbers.length === 2) {
        counter += gears[gearId].numbers[0] * gears[gearId].numbers[1]	
      }
    });

    console.log("Day 3 Part 2 Result: " + counter);
  });
};

module.exports = part2;
