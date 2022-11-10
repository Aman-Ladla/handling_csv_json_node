// converting csv to json
// sorting as per first_name
// json to new csv sorted

const fs = require("fs");
const convertor = require("json-2-csv");
const toJson = require("csvtojson");
const path = require("path");

const main = async () => {
    const users = await toJson().fromFile(
        path.join(__dirname, "./data/users.csv")
    );
    users.sort((a, b) =>
        a["first_name"] > b["first_name"]
            ? 1
            : b["first_name"] > a["first_name"]
            ? -1
            : 0
    );
    const filename = path.join(__dirname, "./data/", "sorted-users.csv");
    convertor.json2csv(users, (err, csv) => {
        if (err) {
            console.log(err);
        }
        fs.writeFileSync(filename, csv);
    });
};

main();
