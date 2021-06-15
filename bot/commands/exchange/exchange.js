const {MessageEmbed} = require("discord.js");
const {EKIP, EKP} = require("../../index");
const fs = require("fs");
const path = require("path");

module.exports.run = (client, message, args) => {
    const market = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/market.json")));
    let sells = [];
    market.sells.forEach((sell, index) => {
        if(index > 5) return;
        sells.push(`Price: **${sell.price} USDT** Amount: **${sell.amount} EKP**  Total: **${sell.total} USDT** Sum: **${sell.sum} USDT**`);
    });
    if(market.sells.length < 1) sells[0] = "nothing";
    let buys = [];
    market.buys.forEach((buy, index) => {
        if(index > 5) return;
        buys.push(`Price: **${buy.price} USDT** Amount: **${buy.amount} EKP**  Total: **${buy.total} USDT** Sum: **${buy.sum} USDT**`);
    });
    if(market.buys.length < 1) buys[0] = "nothing";
    const percentage = EKP.getPercentage();
    const exchange = {
        title: "Trade Ekip (EKP)",
        description: `Here you can see the actual Ekip price and his evolution ${args[0]}`,
        image: "https://www.gizmotimes.com/wp-content/uploads/2018/02/Crypto-Graph.png",
        fields: [
            {
                title: `${EKP.getValue()} ${percentage}%`,
                description: `${EKP.getMarketValue()}$ market cap`
            },
            {
                title: "Buys",
                description: buys.splice(0, 3).join("\n\n")
            },
            {
                title: "Sells",
                description: sells.splice(0, 3).join("\n\n")
            }
        ],
        color: percentage > 0 ? "#57F287" : "#ED4245",
        author: {
            name: message.author.username,
            avatar: message.author.avatarURL()
        },
        footer: {
            name: client.user.username,
            avatar: client.user.avatarURL()
        },
        timestamp: Date.now()
    }


    const embed = new MessageEmbed();
    embed.setAuthor(exchange.author.name, exchange.author.avatar);
    embed.setImage(exchange.image);
    embed.setColor(exchange.color);
    embed.setDescription(exchange.description);
    embed.setFooter(exchange.footer.name, exchange.footer.avatar);
    embed.setTimestamp(exchange.timestamp);
    embed.setTitle(exchange.title);
    exchange.fields.forEach(f => {
        embed.addField(f.title, f.description);
    })
    message.channel.send(embed);
}

module.exports.help = {
    name: "exchange"
}