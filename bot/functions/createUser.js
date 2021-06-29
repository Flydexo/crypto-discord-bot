const fs = require("fs");
const path = require("path");
const createUser = (user, address) => {
    const userObj = {
        id: user.id,
        address: address,
        dWallet: 100,
        messages: 0
    };
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    data.push(userObj);
    fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.error(err);
        }
    })
}

module.exports = createUser;