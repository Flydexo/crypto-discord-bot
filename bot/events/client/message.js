const EKIP = require("../../../blockchain/index");
const Transaction = require('../../../blockchain/Transaction')
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

module.exports = (client, message) => {
    console.log(process.env.messageCount);
    if(message.author.bot) return;
    if(message.channel.type == "dm") return client.emit('dm', message);
    process.env.messageCount++;
    if(client.wallets && client.wallets.has(message.author.id)){
        const transaction = new Transaction(null, client.wallets.get(message.author.id), 0.01);
        EKIP.pendingTransactions.push(transaction);
    }
    if(process.env.messageCount == 5){
        process.env.messageCount = 0;
        EKIP.minePendingTransaction(client.wallets.random());
    }
    if(!message.content.includes("!")) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift();
    const cmd = client.commands.get(command);
    cmd.run(client, message, args);
}