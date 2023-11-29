async function runScript(day, part, visualize) {
  const scriptPart1 = require(`../scripts/Day-${day}/part1.js`);
  const scriptPart2 = require(`../scripts/Day-${day}/part2.js`);

  // Run the script(s) based on the part parameter
  if (part === '1') {
    scriptPart1(part, visualize);
  } else if (part === '2') {
    scriptPart2(part, visualize);
  } else if (part === "both") {
    await scriptPart1(part, visualize);
    await scriptPart2(part, visualize);
  } else {
    console.log("Invalid part parameter");
  }
}

// Export the function that runs the script
module.exports = runScript;
