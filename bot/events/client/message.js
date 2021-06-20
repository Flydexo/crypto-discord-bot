const {EKIP} = require("../../index");
const {memberMultiplier, messageLength} = require('../../config');

module.exports = (client, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return client.emit('dm', message);
    if(message.content.length >= messageLength){
        process.env.messageCount++;
        if(process.env.messageCount == message.guild.memberCount * memberMultiplier){
            process.env.messageCount = 0;
            EKIP.minePendingTransaction(client.wallets.random().ekp, client);
        }
    }
    if(!message.content.startsWith("!")) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift();
    const cmd = client.commands.get(command);
    if(!cmd) return;
    if(cmd.help.role && !message.member.roles.cache.get(cmd.help.role)) return message.reply(`Missing role: ${message.channel.guild.roles.cache.get(cmd.help.role).toString()}`);
    if(cmd.help.user && message.author.id != cmd.help.user) return message.reply("Permission denied");
    cmd.run(client, message, args);
}