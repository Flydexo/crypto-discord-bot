const DISCORD = require('discord.js');
const { TOKEN } = require('./config.js');
const client = new DISCORD.Client();
const Blockchain = require("../blockchain/BlockChain");
const Currency = require("../blockchain/Currency");

module.exports.EKIP = new Blockchain();
module.exports.EKP = new Currency();
module.exports.client = client;
const {initEvents, initCommands, initWallets, initSells, initBuys, initTrades} = require('./functions/init.js');
const startIntervals = require("./intervals");
process.env.messageCount = 0;
initEvents(client);
initCommands(client);
initWallets(client);
initSells(client);
initBuys(client);
initTrades(client);
startIntervals();



client.login(TOKEN);