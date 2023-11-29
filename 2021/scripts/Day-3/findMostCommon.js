const findMostCommon = (data) => {
  const counts = Array(data[0].length).fill(0); // Initialize counts array with 0s
  for (let i = 0; i < data.length; i++) {
    const values = data[i].split("");
    for (let j = 0; j < values.length; j++) {
      counts[j] += parseInt(values[j]);
    }
  }
    return counts;
};

module.exports = findMostCommon;
