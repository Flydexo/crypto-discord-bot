const {EKIP} = require("../../index");
const {memberMultiplier, messageLength} = require('../../config');

module.exports = (client, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return client.emit('dm', message);
    if(message.content.length >= messageLength){
        process.env.messageCount++;
        if(process.env.messageCount == message.guild.memberCount * memberMultiplier){
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