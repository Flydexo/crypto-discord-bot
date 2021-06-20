module.exports.run = (client, message, args) => {
    message.author.send("type your transaction !transaction privateKey toAddress amount");
    message.reply("We sent you a DM !");
}

module.exports.help = {
    name: "transaction",
    role: "855151242257891348"
}