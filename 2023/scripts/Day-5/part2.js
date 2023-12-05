const fs = require("fs");
const path = require("path");

const part1 = () => {
  const filePath = path.join(__dirname, "data.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = data.split("\r\n");

    const seeds = data.splice(0, 1)[0].split("seeds: ")[1].split(" ");
    data.splice(0, 2)
    const seedToSoil = []
    while (data[0] !== '') {
      seedToSoil.push(data.splice(0, 1)[0].split(" "))
    }
    data.splice(0, 2)
    const soilToFertilizer = []
    while (data[0] !== '') {
      soilToFertilizer.push(data.splice(0, 1)[0].split(" "))
    }
    data.splice(0, 2)
    const fertilizerToWater = []
    while (data[0] !== '') {
      fertilizerToWater.push(data.splice(0, 1)[0].split(" "))
    }
    data.splice(0, 2)
    const waterToLigth = []
    while (data[0] !== '') {
      waterToLigth.push(data.splice(0, 1)[0].split(" "))
    }
    data.splice(0, 2)
    const ligthToTemperature = []
    while (data[0] !== '') {
      ligthToTemperature.push(data.splice(0, 1)[0].split(" "))
    }
    data.splice(0, 2)
    const temperatureToHumidity = []
    while (data[0] !== '') {
      temperatureToHumidity.push(data.splice(0, 1)[0].split(" "))
    }
    data.splice(0, 2)
    const humidityToLocation = []
    while (data.length !== 0) {
      humidityToLocation.push(data.splice(0, 1)[0].split(" "))
    }
    
    let lowestLocation = -1
    let lowestSeed = -1
    let storeSeedToSoil = []
    let storeSoilToFertilizer = []
    let storeFertilizerToWater = []
    let storeWaterToLigth = []
    let storeLigthToTemperature = []
    let storeTemperatureToHumidity = []
    let storeHumidityToLocation = []
    let storeData = { from: 0, to: 0, value: 0 }
    for (i = 0; i < seeds.length; i = i + 2){
      let startSeed = parseInt(seeds[i])
      let nOfSeeds = parseInt(seeds[i + 1])
      seedToSoil.forEach(range => {
        const values = range
        
      });

      if(lowestLocation === -1 || lowestLocation > seedPosition) {
        lowestLocation = seedPosition
      }
      
    }

    console.log("Day 5 Part 1 Result: " + lowestLocation);
  });
};

module.exports = part1;
