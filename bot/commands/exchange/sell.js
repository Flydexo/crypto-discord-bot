const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../../blockchain/index");

module.exports.run = (client, message, args) => {
    message.author.send("!sell yourprivateKey amount-of-coins (market/limit)");
    message.reply("We sent you a DM !");
}

module.exports.help = {
    name: "sell"
}