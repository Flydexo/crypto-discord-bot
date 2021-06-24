const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../index");
const fs = require("fs");
const path = require("path");
const { commands } = require("../../data/commands");

module.exports.run = (client, interaction) => {
    const market = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/market.json")));
    const user = client.users.cache.get(interaction.member.user.id);
    let sells = [];
    market.sells.forEach((sell, index) => {
        if(index > 5) return;
        sells.push(`Price: **${sell.price} USDT** Amount: **${sell.amount} EKP**  Total: **${sell.total} USDT** Sum: **${sell.sum} USDT**`);
    });
    if(market.sells.length < 1) sells[0] = "nothing";
    let buys = [];
    market.buys.forEach((buy, index) => {
        if(index > 5) return;
        buys.push(`Price: **${buy.price} USDT** Amount: **${buy.amount} EKP**  Total: **${buy.total} USDT** Sum: **${buy.sum} USDT**`);
    });
    if(market.buys.length < 1) buys[0] = "nothing";
    const embed = new MessageEmbed();
    embed.setAuthor(user.username, user.avatarURL());
    embed.setColor("#EB459E");
    embed.setDescription(`Here is the market of the EKIP currency !`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`EKIP Market`);
    embed.addField("Buys", buys.join('\n\n'));
    embed.addField("Sells", sells.join("\n\n"));
    return embed;
}

module.exports.help = commands.orders;