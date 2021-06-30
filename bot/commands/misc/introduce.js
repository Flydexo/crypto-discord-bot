const { guild, channels, roles } = require("../../config");
const {commands} = require("../../data/commands");

module.exports.run = (client, interaction) => {
    client.guilds.cache.get(guild).channels.cache.get(channels.boost).send(`${client.guilds.cache.get(guild).roles.cache.get(roles.boosterMention)} ${interaction.options.first().value}`)

    interaction.member.roles.remove(roles.boosterFirst);

    interaction.reply({
        ephemeral: true,
        content: "Introduction sent"
    });

}

module.exports.help = commands.introduce;