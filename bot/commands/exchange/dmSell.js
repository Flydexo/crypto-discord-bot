const {MessageEmbed} = require("discord.js");
const {EKP, EKIP} = require("../../index");
const {addSell} = require("../../functions/market.js");

module.exports.run = (client, message, args) => {
    const amount = parseFloat(args[1]);
    const privateKey = args[0];
    const exchangeType = args[2];
    const seller = client.wallets.get(message.author.id).ekp;
    if(EKIP.getBalance(seller) < amount) return message.reply("Insuficient funds !");
    if(!exchangeType) return message.reply("Please enter an exchange type");
    if(exchangeType == "market" || !isNaN(parseFloat(exchangeType))){
        const price = exchangeType == "market" ? EKP.getValue() : parseFloat(exchangeType);
        const total = price * amount;
        const sell = {
            price: price,
            amount: amount,
            total: total,
            sum: total,
            privateKey: privateKey,
            seller: seller
        };
        addSell(sell);
        client.sells.set(sell.id, {price: price, amount: amount, total: total, sum: total, privateKey: privateKey, id: sell.id, publicKey: seller});
        client.emit('buy', "sell", sell);
        client.emit("order", sell, "sell");
        return message.reply("Sell added !");
    }else{
        return message.reply("Please enter a valid exchange type")
    }
    // client.selling.set(message.author.id, {amount: amount, publicKey: seller.ekp, privateKey: privateKey});
}

module.exports.help = {
    name: "dmsell",
    role: "855151242257891348"
}