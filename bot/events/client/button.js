const { guild } = require("../../config");

module.exports = async (client, interaction) => {
    const message = await interaction.fetchReply();
	const filter = i => i.customID.includes("role");

	message.awaitMessageComponentInteraction(filter, { time: 15000 })
		.then(i => console.log(`${i.customID} was clicked!`))
		.catch(console.error);
    //     console.log(interaction, interaction.data);
//     const role_id =  interaction.data.custom_id.split("_")[1];
//     client.guilds.cache.get(guild).members.cache.get(interaction.member.user.id).client.guilds.cache.get(guild).roles.cache.get(role_id);
//     client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//         type: 1
//     }})
}