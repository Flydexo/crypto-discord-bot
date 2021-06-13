module.exports.run = (client, message, args) => {
    client.emit("guildMemberAdd", message.guild.members.cache.get('381748591963799553'));
}

module.exports.help = {
    name: "emit"
}