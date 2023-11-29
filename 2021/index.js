const parseArgs = require("./helpers/parseArgs");
const getScripts = require("./helpers/getScripts");
const runScript = require("./helpers/runScript");

const args = parseArgs(process.argv.slice(2));

let day = args.day || -1;
let visualize = args.part === "true" || false;
let part = args.part || -1;

if (day === -1) {
  const scripts = { 0: "All Scripts", ...getScripts() };
  Object.entries(scripts).forEach(([key, value]) => {
    console.log(`${key}. ${value}`);
  });
  console.log("-1. Exit");

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Enter the script number (0 to exit): ", (scriptNumber) => {
    if (scriptNumber === "-1") {
      console.log("Exiting the script...");
      process.exit(0);
    } else if (scriptNumber === "0") {
      console.log("Running all scripts...");
      Object.keys(scripts).forEach((key) => {
        if (key !== "0") {
          runScript(key, "both", false);
        }
      });
      readline.close();
      process.exit(0);
    } else if (scripts[scriptNumber]) {
      readline.question(
        "Enter the part number (1, 2, or both): ",
        (partNumber) => {
          if (
            partNumber === "1" ||
            partNumber === "2" ||
            partNumber === "both"
          ) {
            day = scriptNumber;
            part = partNumber;
            if (args.visualize) {
              visualize = true;
              readline.close();
              // Run the selected script with the chosen part and visualization option
              runScript(day, part, visualize);
            } else {
              readline.question(
                "Visualize the result? (Y/n): ",
                (shouldVisualize) => {
                  visualize = shouldVisualize.toLocaleLowerCase() === "true";
                  readline.close();
                  // Run the selected script with the chosen part and visualization option
                  runScript(day, part, visualize);
                }
              );
            }
          } else {
            console.log("Invalid part number. Exiting the script...");
            readline.close();
            process.exit(0);
          }
        }
      );
    } else {
      console.log("Invalid script number. Exiting the script...");
      readline.close();
      process.exit(0);
    }
  });
} else {
  // Run the script with the provided day, part, and visualization option
  runScript(day, part, visualize);
}
