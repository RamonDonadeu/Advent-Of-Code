async function runScript(day, part, visualize) {
  const scriptPart1 = require(`../scripts/Day-${day}/part1.js`);
  const scriptPart2 = require(`../scripts/Day-${day}/part2.js`);
  // Run the script(s) based on the part parameter
  if (part === "1") {
    await scriptPart1(visualize);
  } else if (part === "2") {
    await scriptPart2(visualize);
  } else if (part === "both") {
    await scriptPart1(visualize);
    await scriptPart2(visualize);
  } else {
    console.log("Invalid part parameter");
  }
}

// Export the function that runs the script
module.exports = runScript;
