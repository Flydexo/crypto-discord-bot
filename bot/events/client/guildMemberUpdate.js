const {MessageEmbed} = require('discord.js');
const Transaction = require('../../../blockchain/Transaction');
const {EKP, EKIP} = require('../../index');
const moment = require("moment");
const fs = require('fs');
module.exports = (client, oldMember, member) => {
    // console.log(oldMember);
    fs.writeFileSync('./lol.json', JSON.stringify(oldMember, null, 2), err => {
        if(err) throw err;
    })
    if (!oldMember.premiumSince && member.premiumSince) {
        console.log("diff");
        const months = moment(moment(Date.now()).valueOf() - member.premiumSince).format("L");
        //  - moment(member.premiumSince).subtract(10, "months").unix()
        // const months = moment(member.premiumSince).subtract(10, "months").to(Date.now());
        console.log(months);
        // let price = EKP.getValue() * 3.29 * (months / 4);
        // EKIP.addTransaction(new Transaction(null, client.wallets.get(member.user.id).ekp, price));
    }
}