const {MessageEmbed} = require("discord.js");
const { prefix } = require("../../config");
const { commands } = require("../../data/commands");
const {EKIP} = require("../../index");
const {addSell} = require("../../functions/market.js");


module.exports.run = (client, interaction) => {
    const exchangeType = interaction.options.first();
    const amount = parseFloat(exchangeType.options.get("amount").value);
    const privateKey = exchangeType.options.get("private_key").value;
    const seller = client.wallets.get(interaction.member.user.id).ekp;
    if(EKIP.getBalance(seller) < amount) return interaction.reply({
        ephemeral: true,
        content: "Insuficient funds !"
    });
    const price = exchangeType.value == "market" ? EKP.getValue() : parseFloat(exchangeType.options.get("price").value);
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
    return interaction.reply({
        content: "Sell added !",
        ephemeral: true
    });
}

module.exports.help = commands.sell;