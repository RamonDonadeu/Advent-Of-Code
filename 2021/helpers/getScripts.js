const fs = require("fs");

const getScripts = () => {
  const excludedFolders = ["Day-X"]; // Replace 'X' with the actual day number

  const folders = fs
    .readdirSync("scripts")
    .filter((folder) => !excludedFolders.includes(folder));

  const scripts = folders.reduce((acc, folder) => {
    const dayNumber = folder.split("-")[1]; // Assuming the folder name is in the format 'Day-X'
    acc[parseInt(dayNumber)] = folder.replace("-", " ");
    return acc;
  }, {});

  return scripts;
};
module.exports = getScripts;
