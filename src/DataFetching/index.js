const convertor = require("json-2-csv");
const fs = require("fs");
const path = require("path");

const fetchingData = async () => {
    return await new Promise((resolve, reject) => {
        const data = [];
        let counter = 0;
        const interval = setInterval(async () => {
            const res = await fetch("https://random-data-api.com/api/v2/users");
            const tempData = await res.json();
            data.push(tempData);
            counter++;
            if (counter == 5) {
                clearInterval(interval);
                resolve(data);
            }
        }, 1000);
    });
};

const main = async () => {
    const data = await fetchingData();
    const filename = path.join(__dirname, "../data/", "users.csv");
    convertor.json2csv(data, (err, csv) => {
        if (err) {
            console.log(err);
        }
        fs.writeFileSync(filename, csv);
    });
};

main();
