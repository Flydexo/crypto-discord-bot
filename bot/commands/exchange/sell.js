const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../index");

module.exports.run = (client, message, args) => {
    message.author.send("!sell yourprivateKey amount-of-coins (market/limit)");
    message.reply("We sent you a DM !");
}

module.exports.help = {
    name: "sell",
    role: "855151242257891348"
}