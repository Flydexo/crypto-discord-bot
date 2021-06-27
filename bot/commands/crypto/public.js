const { guild } = require("../../config");
const { commands } = require("../../data/commands");

module.exports.run = (client, interaction) => {
    const user = client.guilds.cache.get(guild).members.cache.get(interaction.options.first().value);
    console.log(user);
    const wallet = client.wallets.get(user.id);
    if(!wallet) return'This member has not created an account already.'
    interaction.reply({
        content: `${user}'s wallet address: \`${wallet.ekp}\``,
        ephemeral: true
    })
}

module.exports.help = commands.public;