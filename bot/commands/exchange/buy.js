const {MessageEmbed} = require("discord.js");
const {EKP} = require("../../index");
const {addBuy} = require("../../functions/market.js");

module.exports.run = (client, message, args) => {
    const amount = parseFloat(args[0]);
    const exchangeType = args[1];
    const buyer = client.wallets.get(message.author.id);
    if(!exchangeType) return message.reply("Please enter an exchange type");
    if(exchangeType == "market" || !isNaN(parseFloat(exchangeType))){
        const price = exchangeType == "market" ? EKP.getValue("$") : parseFloat(exchangeType);
        if(buyer.doll < price) return message.reply("Insuficient funds !");
        const total = price * amount;
        const buy = {
            buyer: buyer.ekp,
            price: price,
            amount: amount,
            total: total,
            sum: total
        };
        console.log(buy, "1");
        addBuy(buy);
        client.buys.set(buyer.ekp, {price: price, amount: amount, total: total, sum: total, publicKey: buyer.ekp, id: buy.id});
        client.emit("buy", buy);
        console.log(buy, "2");
        return message.reply("Buy added !");
    }else{
        return message.reply("Please enter a valid exchange type")
    }
    // client.selling.set(message.author.id, {amount: amount, publicKey: seller.ekp, privateKey: privateKey});
}

module.exports.help = {
    name: "buy"
}