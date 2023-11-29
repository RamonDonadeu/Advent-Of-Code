const squareOf = (x, i) => {
    if (i === 0) {
        return 1;
    }
    return x * squareOf(x, i - 1);
}

module.exports = squareOf;