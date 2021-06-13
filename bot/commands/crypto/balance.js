const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../index");

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL());
    embed.setColor("#FEE75C");
    embed.setDescription(`Here is displayed the balance of ${message.author.username}`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`${message.author.username}'s balance !`);
    embed.addField("Balance", `**${EKIP.getBalance(client.wallets.get(message.author.id).ekp)}** EKP`);
    embed.addField("Fake Dollar Balance", `**${client.wallets.get(message.author.id).doll}** $`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "balance"
}