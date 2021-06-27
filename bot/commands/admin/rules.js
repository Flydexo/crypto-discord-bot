const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const fs = require("fs");
const path = require('path');
const { commands } = require("../../data/commands");

module.exports.run = (client, interaction) => {
    const button = new MessageButton()
    .setCustomID(`role_nothing_nothing_${interaction.options.get("role").value}_SUCCESS`)
    .setLabel("I have read and I accept the rules")
    .setStyle("SUCCESS")
    const row = new MessageActionRow().addComponents(button)
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/rules.json")));
    const embed = new MessageEmbed();
    embed.setAuthor(data.author, client.user.avatarURL());
    embed.setColor(data.color);
    embed.setDescription(data.description);
    embed.setTimestamp(Date.now());
    embed.setTitle(data.title);
    embed.addFields(data.rules)
    interaction.reply({
        embeds: [embed],
        components: [row]
    });
}

module.exports.help = commands.rules;