const {MessageEmbed} = require("discord.js");
const {EKIP, EKP} = require("../../../blockchain/index");
const { createCanvas, loadImage } = require('canvas');

module.exports.run = (client, message, args) => {
    const value = EKP.getValue(args[0]);
    const values = EKP.getValues(args[1]);
    const isGrowing = EKP.getPercentage();
    console.log(isGrowing);
    const embed = new MessageEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL());
    isGrowing < 0 ? embed.setColor("#ED4245") : embed.setColor("#57F287")
    embed.setDescription(`Coin value: \`${value}\` Percentage: \`${isGrowing}%\``);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`EKIP coin`);
    // embed.addField("Balance", `**${EKIP.getBalance(client.wallets.get(message.author.id))}** EKP`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "trade"
}