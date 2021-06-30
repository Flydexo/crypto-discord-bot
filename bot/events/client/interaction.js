const createUser = require('../../functions/createUser');
const generateKeys = require("../../../blockchain/keyGenerator");
const { guild, holder, hellos } = require('../../config');

module.exports = async (client, interaction) => {
    if(interaction.isCommand()){
        client.commands.get(interaction.commandName).run(client, interaction);
        // interaction.reply({content: interaction.commandName, ephemeral: true});

    }else if(interaction.isButton()){
        if(interaction.customID.includes("role")){
            // interaction.reply("Button");
            interaction.reply({
                ephemeral: true,
                content: "Role added"
            })
            interaction.member.roles.add(interaction.customID.split("_")[3])
        }else if(interaction.customID == "wallet"){
            const keys = generateKeys();
            createUser(interaction.member.user, keys.public);
            client.wallets.set(interaction.member.user.id, {ekp: keys.public, doll: 100});
            client.guilds.cache.get(guild).members.cache.get(interaction.member.user.id).roles.add(holder);
            interaction.reply({
                content: `This is your private key (do not share it) ||${keys.private}|| and your public key \`${keys.public}\``,
                ephemeral: true
            });
        }else if(interaction.customID.startsWith("hi_")){
            interaction.reply({
                content: `${interaction.member} says hello to ${interaction.customID.substring(3, interaction.customID.length)}`,
                files: [hellos[Math.round(Math.random()*hellos.length)]]
            })
        }
    }else{
        interaction.reply({
            ephemeral: true,
            content: "Error"
        });
    }
}