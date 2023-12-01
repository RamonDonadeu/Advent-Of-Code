const parseData = (data) => {
  let result = [];
  let bingos = [];

  const lines = data.split("\n");
  result = lines.splice(0, 1);
  const nOfBingos = lines.length / 6;
  for (let i = 0; i < nOfBingos; i++) {
    lines.splice(0, 1);
    const bingo = [];
    for (let j = 0; j < 5; j++) bingo.push(lines.splice(0, 1) + " ");
    bingos.push(bingo);
  }

  return { order: result[0].split(","), bingos };
};

module.exports = parseData;
