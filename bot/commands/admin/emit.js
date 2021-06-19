module.exports.run = (client, message, args) => {
    // client.emit("guildMemberAdd", message.guild.members.cache.get('381748591963799553'));
    // const old = new GuildMember(client, {
    //     guildID: "852938111255576587",
    //     joinedTimestamp: 1623426692554,
    //     lastMessageChannelID: "855148951045275678",
    //     premiumSinceTimestamp: 1623611391498,
    //     deleted: false,
    //     nickname: null,
    //     userID: "381748591963799553",
    //     displayName: "Flydexo"
    //   }, message.guild)
    client.emit("guildMemberUpdate", message.guild.members.cache.get("747424056453890166"), message.member);
}

module.exports.help = {
    name: "emit"
}