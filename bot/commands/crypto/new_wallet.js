const { commands } = require("../../data/commands")

module.exports.run = (client, interaction) => {
    client.users.cache.get(interaction.member.user.id).send("🛑 Do you want to create a user ? If done your old user will be deleted if you have one").then(msg => {
        msg.react("✅")
        .then(() => {
            msg.react("❌")
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    })
    return "Dm sent";
}

module.exports.help = commands.new_wallet;