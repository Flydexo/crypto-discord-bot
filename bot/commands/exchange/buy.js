const {MessageEmbed} = require("discord.js");
const {EKP} = require("../../index");
const {addBuy} = require("../../functions/market.js");
const { commands } = require("../../data/commands");

module.exports.run = (client, interaction) => {
    console.log(interaction.data.options[0].options[0])
    const amount = parseFloat(interaction.data.options[0].options[0].value);
    const exchangeType = interaction.data.options[0].name;
    const buyer = client.wallets.get(interaction.member.user.id);
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
        client.emit("order", buy, "buy");
        return "Buy added !";
    }else{
        return "Please enter a valid exchange type"
    }
    // client.selling.set(message.author.id, {amount: amount, publicKey: seller.ekp, privateKey: privateKey});
}

module.exports.help = commands.buy;