const { commands } = require("../../data/commands")
const {MessageActionRow, MessageButton} = require("discord.js");

module.exports.run = (client, interaction) => {
    const button = new MessageButton()
            .setLabel("Create a wallet")
            .setStyle("PRIMARY")
            .setCustomID(`wallet`)
    const row = new MessageActionRow()
    if(client.wallets.get(interaction.member.user.id)){
        button.setLabel("I am sure I want to create a new wallet")
        button.setStyle("DANGER")
        row.addComponents(button)
        interaction.reply({
            content: `You have already an account with this public key: \`${client.wallets.get(interaction.member.user.id).ekp}\` \n Are you sure you want to recreate a wallet`,
            ephemeral: true,
            components: [row]
        })
    }else{
        row.addComponents(button)
        interaction.reply({
            content: ` Do you want to create a wallet ?`,
            ephemeral: true,
            components: [row]
        })
    }
    
    return "Dm sent";
}

module.exports.help = commands.new_wallet;