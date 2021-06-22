const { MessageEmbed } = require("discord.js");
const { guild, channels } = require("../../config")

module.exports = (client, blockchain, currency, order, type) => {
    const embed = new MessageEmbed();
    embed.setColor("#ED4245");
    embed.setDescription(`The new ${type} order added`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`New Order`);
    embed.addField(`${type} order:`, `Price: **${order.price} USDT** Amount: **${order.amount} EKP**  Total: **${order.total} USDT** Sum: **${order.sum} USDT**`);
    client.guilds.cache.get(guild).channels.cache.get(channels.order).send(embed);
}
