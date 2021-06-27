const DISCORD = require('discord.js');
const { TOKEN, APP, prefix } = require('./config.js');
const client = new DISCORD.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [DISCORD.Intents.ALL]});
const Blockchain = require("../blockchain/BlockChain");
const Currency = require("../blockchain/Currency");
const fetch = require('node-fetch');
var FormData = require("form-data");

module.exports.EKIP = new Blockchain();
module.exports.EKP = new Currency();
if(!this.EKIP.isChainValid()) throw "Chain INVALID !!!!!!!!!!"
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
// initSlashCommands(client);
startIntervals();

// client.ws.on('INTERACTION_CREATE', async interaction => {
//   if(interaction.data.custom_id) client.emit("button", interaction);
//   if(client.commands.has(interaction.data.name)){
//     const command = client.commands.get(interaction.data.name);
//     if(command.help.dm){
//       client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//         type: 4,
//         data: {
//           content: `Please write this command in **DM** with this \`${prefix}${command.help.name} ${command.help.usage}\``,
//           flags: 64
//         }
//       }})
//     }else{
//       let content = command.run(client, interaction);
//       if(!command.help.embed && !command.help.wait){
//         if(command.help.visible){
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 4,
//             data: {
//               content: content
//             }
//           }})
//         }else{
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 4,
//             data: {
//               content: content,
//               flags: 64
//             }
//           }})
//         }
//       }else if(command.help.file){
//         if(command.help.visible){
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 5,
//             data: {
//               content: `waiting...`
//             }
//           }}).then(async () => {
//               const wc = new DISCORD.WebhookClient(APP, interaction.token);
//               wc.send({
//                 files: [content]
//               });
//           })
//         }else{
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 5,
//             data: {
//               content: `waiting...`,
//               flags: 64
//             }
//           }}).then(async () => {
//             const wc = new DISCORD.WebhookClient(APP, interaction.token);
//             wc.send({
//               files: [content]
//             });
//           })
//         }
//       }else if(command.help.wait){
//         if(command.help.visible){
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 5,
//             data: {
//               content: `waiting...`
//             }
//           }}).then(async () => {
//               const wc = new DISCORD.WebhookClient(APP, interaction.token);
//               content.then(c => {
//                 wc.send({
//                   content: "lol",
//                   components: [{
//                       type: 1,
//                       components: [c]
//                   }]
//                 });
//               });
//           })
//         }else{
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 5,
//             data: {
//               content: `waiting...`,
//               flags: 64
//             }
//           }}).then(async () => {
//             const wc = new DISCORD.WebhookClient(APP, interaction.token);
//             content.then(c => {
//               wc.send({
//                 content: c
//               });
//             });
//           })
//         }
//       }else{
//         if(command.help.visible){
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//             type: 5,
//             data: {
//               content: `waiting...`
//             }
//           }}).then(async () => {
//               const wc = new DISCORD.WebhookClient(APP, interaction.token);
//               wc.send({
//                 embeds: [content]
//               });
//           })
//         }else{
//           client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//               type: 5,
//               data: {
//                 content: `waiting...`,
//                 flags: 64
//               }
//             }}).then(async () => {
//               const wc = new DISCORD.WebhookClient(APP, interaction.token);
//               wc.send({
//                 embeds: [content]
//               });
//           })
//         }
//       }
//     }
//   }    
// })

client.login(TOKEN);