const {EKIP} = require("../../index");
const Transaction = require('../../../blockchain/Transaction')
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

module.exports = (client, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return client.emit('dm', message);
    if(message.content.length >= 2){
        process.env.messageCount++;
        if(process.env.messageCount == message.guild.memberCount * 1){
            process.env.messageCount = 0;
            EKIP.minePendingTransaction(client.wallets.random().ekp);
        }
    }
    if(!message.content.startsWith("!")) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift();
    const cmd = client.commands.get(command);
    cmd.run(client, message, args);
}