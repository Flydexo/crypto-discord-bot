const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../../blockchain/index");
const fs = require("fs");
const path = require("path");

module.exports.run = (client, message, args) => {
    const market = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/market.json")));
    let sells = [];
    market.sells.forEach(sell => {
        sells.push(`**${sell.price}$** - **${sell.amount} EKP** \n Proposed by: ${message.guild.members.cache.get(sell.seller)}`)
    })
    if(market.sells.length < 1) sells[0] = "nothing";
    let buys = [];
    market.buys.forEach(buy => {
        sells.push(`**${buy.amount} EKP** - **${buy.price}$** \n Asked by: ${message.guild.members.cache.get(sell.buyer)}`)
    })
    if(market.buys.length < 1) buys[0] = "nothing";
    const embed = new MessageEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL());
    embed.setColor("#EB459E");
    embed.setDescription(`Here is the market of the EKIP currency !`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`EKIP Market`);
    embed.addField("Buys", buys.join('\n'));
    embed.addField("Sells", sells.join("\n"));
    message.channel.send(embed);
}

module.exports.help = {
    name: "market"
}