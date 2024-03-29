const parseArgs = (args) => {
    const parsedArgs = {};

    args.forEach((arg) => {
        const parts = arg.split("=");

        parsedArgs[parts[0]] = parts[1];
    });

    return parsedArgs;
};

module.exports = parseArgs;
