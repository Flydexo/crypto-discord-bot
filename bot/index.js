const DISCORD = require('discord.js');
const client = new DISCORD.Client();

const {initEvents, initCommands} = require('./functions/init.js');
initEvents(client);
initCommands(client);

client.login('ODUzMTYxNjA2MDg2MzkzODY2.YMRWqQ.2cnFAAAL7ePKVJuJV3DonWUP7jw');