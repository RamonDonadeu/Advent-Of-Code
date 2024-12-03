module.exports = parseData = (data) => {
    data = data.split("\n");
    data = data.map(line => line.split(" ").map(Number));
    return data;
};