const fs = require("fs");
const path = require("path");

const getNextLocaion = (source, destination, mapping) => {
  for (const value of source) {
    let changedPosition = false;
    for (const range of mapping) {
      const [from, start, length] = range.map(Number);
      if (changedPosition) {
        break;
      }
      // If the start is in the range
      if (
        value.from >= start &&
        value.from <= start + length &&
        !changedPosition
      ) {
        // If the end is in the range
        if (value.to <= start + length) {
          destination.push({
            from: from + value.from - start,
            to: from + value.to - start,
          });
          changedPosition = true;
        }
        // If the end is not in the range
        else {
          const firstValuePosition = from + value.from - start;
          const lastValueDestination = from + length;
          destination.push({
            from: firstValuePosition,
            to: lastValueDestination,
          });
          source.push({ from: start + length + 1, to: value.to });
          changedPosition = true;
        }
      }
      // If the start is before the start of the range
      else if (value.from < start && !changedPosition) {
        // If the end is in the range
        if (value.to >= start && value.to <= start + length) {
          destination.push({ from: from, to: from + value.to - start });
          source.push({ from: value.from, to: start - 1 });
          changedPosition = true;
        }
        // If the end is after the range
        else if (start + length < value.to) {
          destination.push({ from: from, to: from + length });
          source.push({ from: value.from, to: start - 1 });
          source.push({ from: start + length + 1, to: value.to });
        }
      }
    }
    // If the value is not in the range
    if (!changedPosition) {
      destination.push(value);
    }
  }
};

const part1 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\n");

    const seeds = data.splice(0, 1)[0].split("seeds: ")[1].split(" ");
    data.splice(0, 2);
    const seedToSoil = [];
    while (data[0] !== "") {
      seedToSoil.push(data.splice(0, 1)[0].split(" "));
    }
    data.splice(0, 2);
    const soilToFertilizer = [];
    while (data[0] !== "") {
      soilToFertilizer.push(data.splice(0, 1)[0].split(" "));
    }
    data.splice(0, 2);
    const fertilizerToWater = [];
    while (data[0] !== "") {
      fertilizerToWater.push(data.splice(0, 1)[0].split(" "));
    }
    data.splice(0, 2);
    const waterToLigth = [];
    while (data[0] !== "") {
      waterToLigth.push(data.splice(0, 1)[0].split(" "));
    }
    data.splice(0, 2);
    const ligthToTemperature = [];
    while (data[0] !== "") {
      ligthToTemperature.push(data.splice(0, 1)[0].split(" "));
    }
    data.splice(0, 2);
    const temperatureToHumidity = [];
    while (data[0] !== "") {
      temperatureToHumidity.push(data.splice(0, 1)[0].split(" "));
    }
    data.splice(0, 2);
    const humidityToLocation = [];
    while (data.length !== 0) {
      humidityToLocation.push(data.splice(0, 1)[0].split(" "));
    }

    let lowestLocation = -1;
    let lowestSeed = -1;
    let storeSeed = [];
    let storeSeedToSoil = [];
    let storeSoilToFertilizer = [];
    let storeFertilizerToWater = [];
    let storeWaterToLigth = [];
    let storeLigthToTemperature = [];
    let storeTemperatureToHumidity = [];
    let storeHumidityToLocation = [];

    let storeData = { from: 0, to: 0, value: 0 };
    for (i = 0; i < seeds.length; i = i + 2) {
      storeData.from = parseInt(seeds[i]);
      storeData.to = parseInt(seeds[i + 1]) + storeData.from - 1;
      storeSeed.push({ ...storeData });
    }

    getNextLocaion(storeSeed, storeSeedToSoil, seedToSoil);
    getNextLocaion(storeSeedToSoil, storeSoilToFertilizer, soilToFertilizer);
    getNextLocaion(
      storeSoilToFertilizer,
      storeFertilizerToWater,
      fertilizerToWater
    );
    getNextLocaion(storeFertilizerToWater, storeWaterToLigth, waterToLigth);
    getNextLocaion(
      storeWaterToLigth,
      storeLigthToTemperature,
      ligthToTemperature
    );
    getNextLocaion(
      storeLigthToTemperature,
      storeTemperatureToHumidity,
      temperatureToHumidity
    );
    getNextLocaion(
      storeTemperatureToHumidity,
      storeHumidityToLocation,
      humidityToLocation
    );

    storeHumidityToLocation.forEach((value) => {
      if (lowestLocation === -1 || lowestLocation > value.from) {
        lowestLocation = value.from;
      }
    });
    console.log("Day 5 Part 2 Result: " + lowestLocation);
  });
};

module.exports = part1;
