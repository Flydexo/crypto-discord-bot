const { guild } = require("../../config");

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
            interaction.member.roles.add("857361017033719889")
        }
    }else{
        interaction.reply("Error");
    }
}