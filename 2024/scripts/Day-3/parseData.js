module.exports = parseData = (data) => {
    const re = /(mul+\(+\d+\,+\d+\))/g
    data = data.match(re)
    return data
};