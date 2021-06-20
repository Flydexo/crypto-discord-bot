const {MessageEmbed} = require('discord.js');
const {channels} = require("../../config")
module.exports = (client, member) => {
    member.send(`Welcome ${member}`);
    const embed = new MessageEmbed();
    embed.setAuthor(member.user.tag, member.user.avatarURL());
    embed.setColor("#5865F2");
    embed.setDescription(`To start your crypto adventure type \`!createuser\` ! \n You will recieve fake \`100$\` to start !`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`Welcome ${member.displayName}`);
    member.guild.channels.cache.get(channels.talk).send(embed);

    member.guild.fetchInvites().then(gInvite => {
        const invite = gInvite.find(inv => client.invites.get(inv.code).uses < inv.uses);
        // console.log(client.invites, gInvite);
        if(invite){
            client.invites.set(invite.code, invite);
            client.emit("invite", invite);
        }
    })
}