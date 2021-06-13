const {MessageEmbed} = require("discord.js");
const {EKP} = require("../../../blockchain/index");
const {addBuy} = require("../../functions/market.js");

module.exports.run = (client, message, args) => {
    const amount = args[0];
    const exchangeType = args[1];
    const buyer = client.wallets.get(message.author.id);
    if(!exchangeType) return message.reply("Please enter an exchange type");
    if(exchangeType == "market" || !isNaN(parseFloat(exchangeType))){
        const price = exchangeType == "market" ? EKP.getValue("$") : parseFloat(exchangeType);
        console.log(price);
        if(buyer.doll < price) return message.reply("Insuficient funds !");
        const buy = {
            buyer: message.author.id,
            price: price,
            publicKey: buyer.ekp,
            amount: amount
        };
        addBuy(buy);
        client.buys.set(message.author.id, {price: price, publicKey: buyer.ekp, amount: amount});
        return message.reply("Buy added !");
    }else{
        return message.reply("Please enter a valid exchange type")
    }
    // client.selling.set(message.author.id, {amount: amount, publicKey: seller.ekp, privateKey: privateKey});
}

module.exports.help = {
    name: "buy"
}