const DISCORD = require('discord.js');
const { TOKEN } = require('./config.js');
const client = new DISCORD.Client();

const {initEvents, initCommands, initWallets} = require('./functions/init.js');
process.env.messageCount = 0;
initEvents(client);
initCommands(client);
initWallets(client);

client.login(TOKEN);