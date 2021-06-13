const {EKIP} = require("../../index");
const Transaction = require("../../../blockchain/Transaction");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
const {deleteSell, deleteBuy} = require("../../functions/market")
module.exports = (client, buy) => {
    const orderToBuy = client.sells.filter(s => s.price == buy.price).filter(s => s.amount >= buy.amount).first();
    console.log(orderToBuy, client.sells);
    if(!orderToBuy) return;
    const from = ec.keyFromPrivate(orderToBuy.privateKey);
    const fromAddress = from.getPublic('hex');
    const to = ec.keyFromPublic(buy.buyer, "hex");
    const toAddress = to.getPublic('hex');
    const transaction = new Transaction(fromAddress, toAddress, buy.amount);
    transaction.sign(from);
    let result = EKIP.addTransaction(transaction);
    client.sells.delete(orderToBuy.seller);
    client.buys.delete(buy.buyer);
    deleteSell(orderToBuy);
    deleteBuy(buy);
}