const binaryToInteger = (binary) => {
    let integer = 0;
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
            integer += Math.pow(2, binary.length - 1 - i);
        }
    }
    return integer;
}


module.exports = binaryToInteger;