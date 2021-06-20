const { MessageEmbed } = require("discord.js");
const { guild, channels } = require("../../config")

module.exports = (client, blockchain, currency, block) => {
    const embed = new MessageEmbed();
    embed.setColor("#EB459E");
    embed.setDescription(`New block created on EKIP blockchain !`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(block.timestamp);
    embed.setTitle(`New **Block**`);
    embed.addFields([
        {
            name: "Nonce",
            value: block.nonce
        },
        {
            name: "Transactions",
            value: block.transactions.length
        },
        {
            name: "Timestamp",
            value: block.timestamp
        },
        {
            name: "Hash",
            value: block.hash
        },
        {
            name: "Previous hash",
            value: block.previousHash
        }
    ]);
    client.guilds.cache.get(guild).channels.cache.get(channels.block).send(embed);
}
