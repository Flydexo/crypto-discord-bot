const { commands } = require("../../data/commands");

module.exports.run = (client, interraction) => {
   return "type your transaction !transaction privateKey toAddress amount";
}

module.exports.help = commands.transaction;