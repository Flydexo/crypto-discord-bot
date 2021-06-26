const {MessageEmbed} = require("discord.js");
const {EKP} = require("../../index");
const {addBuy} = require("../../functions/market.js");
const { commands } = require("../../data/commands");
const message = require("../../events/client/message");

module.exports.run = (client, interaction) => {
    const exchageType = interaction.options.first();
    const amount = parseFloat(exchageType.options.get("amount").value);
    const price = exchageType.name == "market" ? EKP.getValue() : exchageType.options.get("price").value;
    const buyer = client.wallets.get(interaction.member.user.id);
    const total = price * amount;
    if(buyer.doll < total) return message.reply("Insuficient funds !");
    const buy = {
        buyer: buyer.ekp,
        price: price,
        amount: amount,
        total: total,
        sum: total
    };
    console.log(buy);
    addBuy(buy);
    client.buys.set(buyer.ekp, {price: price, amount: amount, total: total, sum: total, publicKey: buyer.ekp, id: buy.id, publicKey: buyer.ekp});
    client.emit("buy", buy);
    client.emit("order", buy, "buy");
    interaction.reply({
        content: "Buy added !",
        ephemeral: true
    })
}

module.exports.help = commands.buy;