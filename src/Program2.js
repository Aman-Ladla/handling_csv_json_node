const toJson = require("csvtojson");
const readline = require("readline-sync");
const path = require("path");

const main = async () => {
    const users = await toJson().fromFile(
        path.join(__dirname, "./data/users.csv")
    );

    //Eg: ward.wilderman
    console.log("Please insert exact username of required user");

    const username = readline.question();

    const user = users.find(
        (user) => user["username"] === username.toLowerCase()
    );
    if (!!user) console.log(user);
    else console.log("No such user exists");
};

main();
