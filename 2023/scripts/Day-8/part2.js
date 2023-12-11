const fs = require("fs");
const path = require("path");


function gcd(a, b) { 
  for (let temp = b; b !== 0;) { 
      b = a % b; 
      a = temp; 
      temp = b; 
  } 
  return a; 
} 

function lcmFunction(a, b) { 
  const gcdValue = gcd(a, b); 
  return (a * b) / gcdValue; 
} 

const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");

    const pathing = data.splice(0, 1)[0];
    data.splice(0, 1);
    const directions = {};
    let followingPaths = [];

    // PARSE
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      directions[line.split(" = ")[0]] = {
        L: line.split(" = ")[1].split(",")[0].split("(")[1],
        R: line.split(" = ")[1].split(", ")[1].split(")")[0],
      };
      if (line.split(" = ")[0].slice(-1) === "A") {
        followingPaths.push(line.split(" = ")[0]);
      }
    }

    const minimumSteps = [];
    for (let i = 0; i < followingPaths.length; i++) {
      let nextStep = 0;
      let stepCounter = 0;
      let actualPath = followingPaths[i];
      while (actualPath.slice(-1) !== "Z") {
        if (nextStep >= pathing.length) {
          nextStep = 0;
        }
        actualPath = directions[actualPath][pathing[nextStep]];
        stepCounter++;
        nextStep++;
      }
      minimumSteps[i] = stepCounter;
    }

    while (minimumSteps.length > 1) {
      const a = minimumSteps.pop();
      const b = minimumSteps.pop();
      const result = lcmFunction(a, b);
      minimumSteps.push(result);
    }
    

    console.log("Day 8 Part 1 Result: " + minimumSteps[0]);
  });
};

module.exports = part2;
