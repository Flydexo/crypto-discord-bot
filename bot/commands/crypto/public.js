module.exports.run = (client, message, args) => {
    const wallet = client.wallets.get(message.mentions.users.first().id);
    if(!wallet) return message.channel.send('This member has not created an account already.')
    return message.channel.send(`${message.mentions.members.first()}'s wallet address: \`${wallet.ekp}\``);
}

module.exports.help = {
    name: "public"
}