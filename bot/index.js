const DISCORD = require('discord.js');
const { TOKEN, APP } = require('./config.js');
const client = new DISCORD.Client();
const Blockchain = require("../blockchain/BlockChain");
const Currency = require("../blockchain/Currency");
const fetch = require('node-fetch');
var FormData = require("form-data");

module.exports.EKIP = new Blockchain();
module.exports.EKP = new Currency();
module.exports.client = client;
const {initEvents, initCommands, initWallets, initSells, initBuys, initTrades, initInvites, initSlashCommands} = require('./functions/init.js');
const startIntervals = require("./intervals");
process.env.messageCount = 0;
initEvents(client, this.EKIP, this.EKP);
initCommands(client);
initWallets(client);
initSells(client);
initBuys(client);
initTrades(client);
initSlashCommands(client);
startIntervals();

client.ws.on('INTERACTION_CREATE', async interaction => {
    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 5,
        data: {
          content: "l"
        }
    }}).then(async () => {
        const lol = await client.commands.get(interaction.data.name).run(client, interaction.data.options[0].value, interaction);
        const wc = new DISCORD.WebhookClient(APP, interaction.token);
        wc.send({
          files: [lol]
        });
    })
    
})

client.login(TOKEN);