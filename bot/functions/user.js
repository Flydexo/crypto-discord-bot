const fs = require('fs');
const path = require('path');

module.exports.updateUserMessages = (client, user, messages) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    data.reverse().forEach((u, index) => {
        if(u.id == user){
            console.log("user");
            data[data.length - 1 - index] = {
                id: user,
                address: u.address,
                dWallet: u.dWallet,
                messages: u.messages + messages
            }
            client.wallets.set(user, data[data.length - 1 - index])
        }
    })
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(data, null, 2), (err) => {
        if(err) throw err;
    })
}

module.exports.pickUser = (client) => {
    const users = client.wallets;

    users[Symbol.iterator] = function* () {
        yield* [...this.entries()]
    }
}