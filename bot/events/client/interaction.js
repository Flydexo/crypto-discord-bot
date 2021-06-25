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
            interaction.member.roles.add(interaction.customID.split("_")[3])
        }
    }else{
        interaction.reply("Error");
    }
}