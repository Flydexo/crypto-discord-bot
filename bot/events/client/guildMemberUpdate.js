const {MessageEmbed} = require('discord.js');
const Transaction = require('../../../blockchain/Transaction');
const {EKP, EKIP} = require('../../index');
const moment = require("moment");
const fs = require('fs');
const {channels, guild, boostMessage} = require('../../config');

module.exports = (client, oldMember, member) => {
    if (!oldMember.premiumSince && member.premiumSince) {
        console.log("aaa");
        member.guild.channels.cache.get(channels.talk).send(`<a:boost2:855529921287290920> ${member} boosted the server ! <a:boost:855529921354530836>`);
        const date = moment(Date.now() - member.premiumSinceTimestamp);
        let months = 1;
        if(date.year() > 1970){
            months = date.month() + 12 * (date.year() - 1970) + 1;
        }else{
            months = date.month() + 1;
        }
        let price = EKP.getValue() * 3.29 * (months / 4);
        EKIP.addTransaction(new Transaction(null, client.wallets.get(member.user.id).ekp, price));
        client.guilds.cache.get(guild).channels.cache.get(channels.logs).messages.fetch(boostMessage).then(msg => {
            let arr = msg.content.split(/ /);
            arr.push(`${member}`);
            msg.edit(arr.join(" "))
        });

    }else if(!member.premiumSince && oldMember.premiumSince){
        client.guilds.cache.get(guild).channels.cache.get(channels.logs).messages.fetch(boostMessage).then(msg => {
            let arr = msg.content.split(/ /);
            arr.forEach((m, index) => {
                if(m == `${member}`){
                    arr[index] = "";
                }
            })
            msg.edit(arr.join(" "))
        });
    }
}