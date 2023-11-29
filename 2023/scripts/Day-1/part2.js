
const fs = require('fs');

const part2 = () => {
    const filePath = path.join(__dirname, 'data.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
};

module.exports = part2;
