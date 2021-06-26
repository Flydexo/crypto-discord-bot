const { prefix } = require("../../config");
const { commands } = require("../../data/commands");

module.exports.run = (client, interraction) => {
   interraction.member.user.send(`\`${prefix}transaction privateKey toAddress amount\``);
   interraction.reply({
      ephemeral: true,
      content: "Check your DMs"
   })
}

module.exports.help = commands.transaction;