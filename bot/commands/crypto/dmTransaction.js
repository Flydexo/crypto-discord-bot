const {MessageEmbed} = require("discord.js");
const {EKIP} = require("../../../blockchain/index");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
const Transaction = require('../../../blockchain/Transaction')
    
module.exports.run = (client, message, args) => {
    if(!args[0] || !args[1] || !args[2]) return message.reply("Please enter an amount and a to address");
    const from = ec.keyFromPrivate(args[0]);
    const fromAddress = from.getPublic('hex');
    const to = ec.keyFromPublic(args[1], "hex");
    const toAddress = to.getPublic('hex');
    const amount = parseFloat(args[2]);

    if(typeof amount != "number" ) return message.reply("Please enter an amount in numbers");

    const transaction = new Transaction(fromAddress, toAddress, amount);
    transaction.sign(from);
    let result = EKIP.addTransaction(transaction);
    if(result == "insufficient funds") return message.reply('Insufficien funds !');
}
    
module.exports.help = {
    name: "dmtransaction"
}