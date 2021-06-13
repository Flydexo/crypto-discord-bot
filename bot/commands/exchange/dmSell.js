const {MessageEmbed} = require("discord.js");
const {EKP} = require("../../../blockchain/index");
const {addSell} = require("../../functions/market.js");

module.exports.run = (client, message, args) => {
    const amount = args[1];
    const privateKey = args[0];
    const exchangeType = args[2];
    const seller = client.wallets.get(message.author.id).ekp;
    if(seller.ekp < amount) return message.reply("Insuficient funds !");
    if(!exchangeType) return message.reply("Please enter an exchange type");
    if(exchangeType == "market" || !isNaN(parseFloat(exchangeType))){
        const price = exchangeType == "market" ? EKP.getValue("$") : exchangeType;
        const sell = {
            seller: message.author.id,
            price: price,
            privateKey: privateKey,
            publicKey: seller,
            amount: amount
        };
        addSell(sell);
        client.sells.set(message.author.id, {price: price, privateKey: privateKey, publicKey: seller, amount: amount});
        return message.reply("Sell added !");
    }else{
        return message.reply("Please enter a valid exchange type")
    }
    // client.selling.set(message.author.id, {amount: amount, publicKey: seller.ekp, privateKey: privateKey});
}

module.exports.help = {
    name: "dmsell"
}