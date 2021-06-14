const {MessageEmbed} = require("discord.js");
const {EKP} = require("../../index");
const {addBuy} = require("../../functions/market.js");

module.exports.run = (client, message, args) => {
    const amount = parseFloat(args[0]);
    const exchangeType = args[1];
    const buyer = client.wallets.get(message.author.id);
    if(!exchangeType) return message.reply("Please enter an exchange type");
    if(exchangeType == "market" || !isNaN(parseFloat(exchangeType))){
        const price = exchangeType == "market" ? EKP.getValue() : parseFloat(exchangeType);
        const total = price * amount;
        if(buyer.doll < total) return message.reply("Insuficient funds !");
        const buy = {
            buyer: buyer.ekp,
            price: price,
            amount: amount,
            total: total,
            sum: total
        };
        addBuy(buy);
        client.buys.set(buyer.ekp, {price: price, amount: amount, total: total, sum: total, publicKey: buyer.ekp, id: buy.id, publicKey: buyer.ekp});
        client.emit("buy", buy);
        return message.reply("Buy added !");
    }else{
        return message.reply("Please enter a valid exchange type")
    }
    // client.selling.set(message.author.id, {amount: amount, publicKey: seller.ekp, privateKey: privateKey});
}

module.exports.help = {
    name: "buy"
}