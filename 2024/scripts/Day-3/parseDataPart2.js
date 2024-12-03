module.exports = parseData = (data) => {
    const re = /(do)+(?=\(\))|(don't)(?=\(\))|(mul+\(+\d+\,+\d+\))/g
    data = data.match(re)
    return data
};