const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {channels, holder} = require("../../config")
module.exports = (client, member) => {
    if(client.wallets.has(member.user.id)) member.roles.add(holder);
    const embed = new MessageEmbed();
    embed.setAuthor(member.user.tag, member.user.avatarURL());
    embed.setColor("#5865F2");
    embed.setDescription(`To start your crypto adventure enter the command \`/new_wallet\` in the server ! \n You will recieve fake \`100$\` to start !`);
    embed.setFooter(client.user.username, client.user.avatarURL());
    embed.setTimestamp(Date.now());
    embed.setTitle(`Welcome ${member.displayName}`);
    member.user.send({
        embeds: [embed]
    });
    const row = new MessageActionRow().addComponents([
        new MessageButton()
        .setCustomID(`hi_${member.user.username}`)
        .setEmoji("👋")
        .setLabel("Say hi !")
        .setStyle("SECONDARY")
    ])
    const channelEmbed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL())
    .setColor("57F287")
    .setTitle("New member joined !")
    .setDescription(`${member} joined the server, welcome him !`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp(Date.now())
    .setImage(member.guild.iconURL({
        size: 256,
        dynamic: true
    }))
    member.guild.channels.cache.get(channels.talk).send({
        embeds: [channelEmbed],
        components: [row]
    })

    member.guild.fetchInvites().then(gInvite => {
        const invite = gInvite.find(inv => client.invites.get(inv.code).uses < inv.uses);
        // console.log(client.invites, gInvite);
        if(invite){
            client.invites.set(invite.code, invite);
            client.emit("invite", invite);
        }
    })
}