const {MessageEmbed} = require("discord.js");
const { guild } = require("../../config");
const { commands } = require("../../data/commands");
const {EKIP} = require("../../index");
const fs = require('fs');
const path = require("path");

module.exports.run = (client, interaction) => {
    console.log("lol");
    return client.guilds.cache.get(guild).channels.cache.get(interaction.channel_id).messages.fetch(interaction.data.options[0].options[0].value).then(async message => {
        const role = client.guilds.cache.get(guild).roles.cache.get(interaction.data.options[0].options[1].value);
        if(!role) return "Role invalid";
        let emoji = client.guilds.cache.get(guild).emojis.cache.get(interaction.data.options[0].options[2].value);
        if(!emoji && interaction.data.options[0].options[2].value.match(/\p{Emoji_Presentation}/gu).length > 0){
            emoji = interaction.data.options[0].options[2].value.match(/\p{Emoji_Presentation}/gu)[0];
            await message.react(emoji);
            const reactions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/reactions.json")));
            reactions.push({
                message: message.id,
                role: role.id,
                emoji: emoji,
                channel: client.guilds.cache.get(guild).channels.cache.get(interaction.channel_id).id
            })
            fs.writeFileSync(path.join(__dirname, "../../data/reactions.json"), JSON.stringify(reactions, null, 2), err => {
                if(err) console.log(err);
            })
            return `Reaction added`;
        }else{
            await message.react(emoji);
            const reactions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/reactions.json")));
            reactions.push({
                message: message.id,
                role: role.id,
                emoji: emoji.toString(),
                channel: client.guilds.cache.get(guild).channels.cache.get(interaction.channel_id).id
            })
            fs.writeFileSync(path.join(__dirname, "../../data/reactions.json"), JSON.stringify(reactions, null, 2), err => {
                if(err) console.log(err);
            })
            return "Reaction added";
        }
    });
}

module.exports.help = commands.select_role;

// console.log(interaction.data.options[0].options[0].value);
// return client.guilds.cache.get(guild).channels.cache.get(interaction.channel_id).messages.fetch(interaction.data.options[0].options[0].value).then(message => {
//     const role = client.guilds.cache.get(guild).roles.cache.get(interaction.data.options[0].options[1].value);
//     let emoji = client.guilds.cache.get(guild).emojis.cache.get(interaction.data.options[0].options[2].value);
//     if(!emoji && interaction.data.options[0].options[2].value.match(/\p{Emoji_Presentation}/gu).length > 1){
//         emoji = interaction.data.options[0].options[2].value.match(/\p{Emoji_Presentation}/gu)[0];
//         console.log(emoji, interaction.data.options[0].options[2].value.match(/\p{Emoji_Presentation}/gu), interaction.data.options[0].options[2].value.match(/\p{Emoji_Presentation}/gu).length);
//         message.react(emoji);
//         return `${message} ${role} ${emoji}`;
//     }else{
//         return "lol";
//     }
//     return "lol"
// });