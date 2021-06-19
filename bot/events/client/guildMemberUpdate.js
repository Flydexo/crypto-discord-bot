const {MessageEmbed} = require('discord.js');
const Transaction = require('../../../blockchain/Transaction');
const {EKP, EKIP} = require('../../index');
const moment = require("moment");
const fs = require('fs');
module.exports = (client, oldMember, member) => {
    if (!oldMember.premiumSince && member.premiumSince) {
        member.guild.channels.cache.get('855150382296203285').send(`<a:boost2:855529921287290920> ${member} boosted the server ! <a:boost:855529921354530836>`);
        const date = moment(Date.now() - member.premiumSinceTimestamp);
        let months = 1;
        if(date.year() > 1970){
            months = date.month() + 12 * (date.year() - 1970) + 1;
        }else{
            months = date.month() + 1;
        }
        let price = EKP.getValue() * 3.29 * (months / 4);
        EKIP.addTransaction(new Transaction(null, client.wallets.get(member.user.id).ekp, price));
    }
}