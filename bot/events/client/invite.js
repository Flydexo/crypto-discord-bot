const Transaction = require('../../../blockchain/Transaction');
const {EKP, EKIP} = require('../../index');
module.exports = (client, invite) => {
    const price = (EKP.getValue() / invite.guild.memberCount);
    EKIP.addTransaction(new Transaction(null, client.wallets.get(invite.inviter.id).ekp, price));
}