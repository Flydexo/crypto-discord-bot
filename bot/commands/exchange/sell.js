const {MessageEmbed} = require("discord.js");
const { prefix } = require("../../config");
const { commands } = require("../../data/commands");
const {EKIP} = require("../../index");

module.exports.run = (client, interaction) => {
    interaction.member.user.send(`\`${prefix}sell yourprivateKey amount-of-coins (market/limit)\``);
    interaction.reply({
        ephemeral: true,
        content: "Check your DMs"
    });
}

module.exports.help = commands.sell;