const fs = require("fs");
const path = require("path");
const part2 = (visualize) => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let sequence = data.split(",");
    let box = 0;
    let hashmap = {};
    sequence.forEach((item) => {
      let label = "";
      let lens = "";
      if (item.includes("=")) {
        label = item.split("=")[0];
        lens = "=" + item.split("=")[1];
      } else {
        label = item.split("-")[0];
        lens = "-";
      }
      box = 0;
      for (let i = 0; i < label.length; i++) {
        box = ((box + label.charCodeAt(i)) * 17) % 256;
      }
      if (!hashmap[box]) {
        hashmap[box] = [];
      }
      let index = hashmap[box].findIndex((item) => item.label === label);
      if (lens[0] === "=") {
        if (index === -1) {
          hashmap[box].push({ label: label, lens: lens[1] });
        } else {
          hashmap[box][index].lens = lens[1];
        }
      } else {
        if (index !== -1) {
          hashmap[box].splice(index, 1);
        }
      }
    });

    let result = 0;
    Object.keys(hashmap).forEach((key) => {
      hashmap[key].forEach((item, index) => {
        result += (parseInt(key) + 1) * parseInt(item.lens) * (index + 1);
      });
    });
    console.log(hashmap);
    console.log("Day 15 Part 2 Result: ", result);
  });
};

module.exports = part2;
