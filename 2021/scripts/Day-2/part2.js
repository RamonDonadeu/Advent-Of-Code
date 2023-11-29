const fs = require("fs");
const path = require("path");
const part2 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");
    let position = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < data.length; i++) {
      const action = data[i].split(" ");
      const direction = action[0];
      const speed = parseInt(action[1]);
      if (direction === "forward") {
        position += speed;
        depth += aim * speed;
      } else if (direction === "down") {
        aim += speed;
      } else if (direction === "up") {
        aim -= speed;
      }
    }
    console.log("Position: " + position + ", Depth: " + depth);
    console.log("Day 2 Part 2 Result: " + position * depth);
  });
};

module.exports = part2;
