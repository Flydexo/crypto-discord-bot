const fs = require("fs");
const path = require('path');
const {Collection} = require('discord.js');
const buy = require("../events/client/buy");

const initEvents = (client) => {
    const categories = fs.readdirSync("./bot/events/");
    categories.forEach(category => {
        const events = fs.readdirSync(`./bot/events/${categories}/`);
        events.forEach(evt => {
            client.on(evt.split(".")[0], require(`../events/${category}/${evt}`).bind(null, client));
        })
    })
}

const initCommands = (client) => {
    client.commands = new Collection();
    const categories = fs.readdirSync('./bot/commands/');
    categories.forEach(category => {
        const commands = fs.readdirSync(`./bot/commands/${category}/`);
        commands.forEach(command => {
            const cmd = require(`../commands/${category}/${command}`);
            client.commands.set(cmd.help.name, cmd);
            console.log("Loaded command: ", cmd.help.name);
        })
    })
}

const initWallets = (client) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    client.wallets = new Collection();
    if(data.length > 0){
        data.forEach(u => {
            client.wallets.set(u.id, {ekp: u.address, doll: u.dWallet});
        })
    }
}

const initSells = (client) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/market.json"))).sells;
    client.sells = new Collection();
    for(sell of data){
        client.sells.set(sell.id, {price: sell.price, amount: sell.amount, total: sell.total, sum: sell.sum, privateKey: sell.privateKey, id: sell.id, publicKey: sell.seller});
    }
}

const initBuys = (client) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/market.json"))).buys;
    client.buys = new Collection();
    for(let buy of data){
        client.buys.set(buy.id, {price: buy.price, amount: buy.amount, total: buy.total, sum: buy.sum, id: buy.id, publicKey: buy.buyer});
    }
}

module.exports = {
    initEvents,
    initCommands,
    initWallets,
    initSells,
    initBuys
}