const {MessageEmbed} = require("discord.js");
const { commands } = require("../../data/commands");
const {EKIP} = require("../../index");

module.exports.run = (client, interaction) => {
    const user = client.users.cache.get(interaction.member.user.id);
    const embed = new MessageEmbed();
    embed.setAuthor(user.username, user.avatarURL());
    embed.setColor("#FEE75C");
    embed.setDescription(`Here is displayed the balance of ${user.username}`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`${user.username}'s balance !`);
    embed.addField("Balance", `**${EKIP.getBalance(client.wallets.get(user.id).ekp)}** EKP`);
    embed.addField("Fake Dollar Balance", `**${client.wallets.get(user.id).doll}** $`);
    interaction.reply({
        embeds: [embed],
        ephemeral: true
    })
}

module.exports.help = commands.balance;