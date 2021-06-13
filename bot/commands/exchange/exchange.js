const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../../blockchain/index");

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL());
    embed.setColor("#FEE75C");
    embed.setDescription(`Here is displayed the balance of ${message.author.username}`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`${message.author.username}'s balance !`);
    embed.addField("Balance", `**${EKIP.getBalance(client.wallets.get(message.author.id))}** EKP`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "exchange"
}