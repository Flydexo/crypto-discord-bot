const {EKIP} = require("../../index");
const Transaction = require("../../../blockchain/Transaction");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
const {deleteSell, deleteBuy, addSell, updateDollars} = require("../../functions/market");
module.exports = (client, buy) => {
    const orderToBuy = client.sells.filter(s => s.price == buy.price).filter(s => s.amount >= buy.amount).first();
    if(!orderToBuy) return;
    const from = ec.keyFromPrivate(orderToBuy.privateKey);
    const fromAddress = from.getPublic('hex');
    const to = ec.keyFromPublic(buy.buyer, "hex");
    const toAddress = to.getPublic('hex');
    const transaction = new Transaction(fromAddress, toAddress, buy.amount);
    let dWallet = client.wallets.filter(w => w.ekp == buy.buyer).first(); 
    updateDollars(dWallet.doll - buy.total, dWallet.ekp);
    dWallet = client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first(); 
    updateDollars(dWallet.doll + buy.total, dWallet.ekp);
    console.log("seller: ", dWallet.doll + buy.total, dWallet.doll);
    client.wallets.filter(w => w.ekp == buy.buyer).first().doll = dWallet.doll - buy.total;
    client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first().doll = dWallet.doll + buy.total;
    console.log(client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first());
    console.log(orderToBuy.seller, " = seller");
    if(buy.amount < orderToBuy.amount){
        const sell = {
            price: orderToBuy.price,
            amount: orderToBuy.amount - buy.amount,
            total: (orderToBuy.amount - buy.amount) * orderToBuy.price,
            sum: (orderToBuy.amount - buy.amount) * orderToBuy.price,
            privateKey: orderToBuy.privateKey,
            seller: orderToBuy.seller
        };
        addSell(sell);
        client.sells.delete(sell.seller);
        client.sells.set(sell.seller, {price: sell.price, amount: sell.amount, total: sell.total, sum: sell.total, privateKey: sell.privateKey, id: sell.id});
    }
    transaction.sign(from);
    EKIP.addTransaction(transaction);
    client.sells.delete(orderToBuy.seller);
    client.buys.delete(buy.buyer);
    deleteSell(orderToBuy);
    deleteBuy(buy);
}