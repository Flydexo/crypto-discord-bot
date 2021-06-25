const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { guild, TOKEN } = require("../../config");
const { commands } = require("../../data/commands");
const {EKIP} = require("../../index");
const fs = require('fs');
const path = require("path");
const fetch = require("node-fetch");

module.exports.run = (client, interaction) => {
    client.guilds.cache.get(guild).channels.cache.get(interaction.channelID).messages.fetch(interaction.options.get("button").options.get("message_id").value).then(async message => {
        const role = interaction.options.get("button").options.get("role").role;
        console.log(interaction.options.get("button").options);
        if(!role) interaction.reply("Role invalid");

        const button = new MessageButton()
            .setLabel(interaction.options.get("button").options.get("label").value)
            .setStyle(interaction.options.get("button").options.get("type").value)
        if(interaction.options.get("button").options.get("emoji_id")){
            button.setEmoji(interaction.options.get("button").options.get("emoji_id").value)
        }
        if(interaction.options.get("button").options.get("url") && interaction.options.get("button").options.get("type").value == "LINK"){
            button.setURL(interaction.options.get("button").options.get("url").value)
        }
        if(!button.url){
            button.setCustomID(`role_${interaction.channelID}_${message.id}_${role.id}`)
        }
        const row = new MessageActionRow()
			.addComponents(button);
        console.log(row);
        if(message.embeds.length > 0){
            await interaction.reply({
                content: message.content,
                embeds: message.embeds,
                components: [row]

            })
        }else{
            await interaction.reply({
                content: message.content,
                components: [row]
            })
        }
    });
}

module.exports.help = commands.select_role_button;