const fs = require("fs");
const path = require('path');
const {Collection} = require('discord.js');
const buy = require("../events/client/buy");
const { TOKEN, APP, guild } = require("../config");
const fetch = require("node-fetch");

const initEvents = (client, blockchain, currency) => {
    const categories = fs.readdirSync("./bot/events/");
    categories.forEach(category => {
        const events = fs.readdirSync(`./bot/events/${category}/`);
        if(category == "client"){
            events.forEach(evt => {
                client.on(evt.split(".")[0], require(`../events/${category}/${evt}`).bind(null, client));
                console.log("New event: ", evt);
            })
        }else{
            events.forEach(evt => {
                client.on(evt.split(".")[0], require(`../events/${category}/${evt}`).bind(null, client, blockchain, currency));
                console.log("New event: ", evt);
            })
        }
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
            client.wallets.set(u.id, {ekp: u.address, doll: u.dWallet, messages: u.messages});
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

const initTrades = (client) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/trades.json")));
    client.trades = [];
    for(let trade of data){
        client.trades.push({timestamp: trade.timestamp, price: trade.price});
    }
}

const initInvites = (client, guildId) => {
    client.invites = new Collection();
    guildI = client.guilds.cache.get(guildId);
    guildI.fetchInvites().then(invites => {
        invites.forEach(ivt => {
            if(ivt.inviter && ivt.uses){
                client.invites.set(ivt.code, ivt);
            }
        })
    })
}

const initSlashCommands = (client) => {
    //https://discord.com/api/v8/applications/<my_application_id>/commands
    console.log(`https://discord.com/api/v8/applications/${APP}/commands/guilds/${guild}/commands`)
    fetch(`https://discord.com/api/v8/applications/856608083953582151/guilds/${guild}/commands`, {
        method: 'POST',
        headers: {
            "Authorization": `Bot ${TOKEN}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify({
                name: "chart",
                description: "chart",
                options: [
                    {
                        name: "time",
                        description: "the time",
                        type: 3
                    }
                ]
            })
    }).then(res => res.json())
    .then(json => console.log(json))
    .catch(e => {
        throw e;
    })
}

module.exports = {
    initEvents,
    initCommands,
    initWallets,
    initSells,
    initBuys,
    initTrades,
    initInvites,
    initSlashCommands,
}