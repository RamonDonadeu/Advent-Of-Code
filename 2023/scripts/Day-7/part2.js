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
    const listOfCards = [
      "A",
      "K",
      "Q",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "J",
    ];
    const listOfRepokers = [];
    const listOfPokers = [];
    const listOfFulls = [];
    const listOfThirds = [];
    const listOfDoubles = [];
    const listOfPairs = [];
    const listOfHighs = [];
    let rankingOfHands = [];
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      const hand = line.split(" ")[0];
      const counts = [];
      for (let j = 0; j < listOfCards.length; j++) {
        const nOfCards = hand.split(listOfCards[j]).length - 1;
        if (listOfCards[j] !== "J") {
          if (nOfCards >= 1) counts.push(nOfCards);
        }
      }
      counts.sort((a, b) => b - a);
      if (hand.includes("J")) {
        counts[0] += hand.split("J").length - 1;
      }
      if (counts.length === 1) {
        listOfRepokers.push(line);
      }
      if (counts.length === 5) {
        listOfHighs.push(line);
      }
      if (counts.length === 4) {
        listOfPairs.push(line);
      }
      if (counts.length === 2) {
        if (counts[0] === 4) {
          listOfPokers.push(line);
        }
        if (counts[0] === 3) {
          listOfFulls.push(line);
        }
      }
      if (counts.length === 3) {
        if (counts[0] === 3) {
          listOfThirds.push(line);
        }
        if (counts[0] === 2) {
          listOfDoubles.push(line);
        }
      }
    }

    listOfRepokers.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    rankingOfHands = rankingOfHands.concat(listOfRepokers);

    listOfPokers.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    rankingOfHands = rankingOfHands.concat(listOfPokers);
    listOfFulls.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    rankingOfHands = rankingOfHands.concat(listOfFulls);
    listOfThirds.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    rankingOfHands = rankingOfHands.concat(listOfThirds);
    listOfDoubles.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    rankingOfHands = rankingOfHands.concat(listOfDoubles);
    listOfPairs.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    rankingOfHands = rankingOfHands.concat(listOfPairs);

    listOfHighs.sort((a, b) => {
      const aCard = a.split(" ")[0];
      const bCard = b.split(" ")[0];
      for (let i = 0; i < aCard.length; i++) {
        if (aCard[i] !== bCard[i]) {
          return listOfCards.indexOf(aCard[i]) - listOfCards.indexOf(bCard[i]);
        }
      }
      return 0;
    });
    let result = 0;
    rankingOfHands = rankingOfHands.concat(listOfHighs);

    for (let i = 0; i < rankingOfHands.length; i++) {
      const bid = parseInt(rankingOfHands[i].split(" ")[1]);
      result += (rankingOfHands.length - i) * bid;
    }

    console.log("Day 7 Part 2 Result: " + result);
  });
};

module.exports = part2;
