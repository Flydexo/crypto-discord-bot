const {MessageEmbed} = require("discord.js");
const { guild, TOKEN } = require("../../config");
const { commands } = require("../../data/commands");
const {EKIP} = require("../../index");
const fs = require('fs');
const path = require("path");
const fetch = require("node-fetch");

module.exports.run = (client, interaction) => {
    client.guilds.cache.get(guild).channels.cache.get(interaction.channelID).messages.fetch(interaction.options.get("button").options.get("message_id").value).then(async message => {
        const role = interaction.options.get("button").options.get("role");
        if(!role) interaction.reply("Role invalid");
        const button = {
            type: 2,
            style: 1,
            label: "I have read the rules and I accept them",
            custom_id: `role_${interaction.channel_id}_${message.id}_${role.id}`
        };
        console.log(message);
        if(message.embeds.length > 0){
            interaction.reply({
                content: message.content,
                embeds: message.embeds,
                components: [{
                    type: 1,
                    components: [button]
                }]
            })
        }else{
            interaction.reply({
                content: message.content,
                components: [{
                    type: 1,
                    components: [button]
                }]
            })
        }
    });
}

module.exports.help = commands.select_role_button;