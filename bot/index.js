const DISCORD = require('discord.js');
const { TOKEN } = require('./config.js');
const client = new DISCORD.Client();

const {initEvents, initCommands, initWallets, initSells, initBuys} = require('./functions/init.js');
process.env.messageCount = 0;
initEvents(client);
initCommands(client);
initWallets(client);
initSells(client);
initBuys(client);

client.login(TOKEN);