const {EKIP} = require("../../index");
const Transaction = require("../../../blockchain/Transaction");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
const {deleteSell, deleteBuy, addSell, updateDollars} = require("../../functions/market");
module.exports = (client, buy, sell = "") => {
    if(buy == "sell"){
        client.buys.filter(b => b.price == sell.price).filter(b => b.amount <= sell.amount).forEach(b => {
            console.log(b);
            client.emit("buy", b);
        })
        return;
    }

    const orderToBuy = client.sells.filter(s => s.price == buy.price).filter(s => s.amount >= buy.amount).first();
    if(!orderToBuy) return;

    const buyerWallet = client.wallets.filter(w => w.ekp == buy.publicKey).first(); 
    updateDollars(buyerWallet.doll - buy.total, buyerWallet.ekp);
    client.wallets.filter(w => w.ekp == buy.publicKey).first().doll = buyerWallet.doll - buy.total;

    const sellerWallet = client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first(); 
    updateDollars(sellerWallet.doll + buy.total, sellerWallet.ekp);
    client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first().doll = sellerWallet.doll + buy.total;

    const from = ec.keyFromPrivate(orderToBuy.privateKey);
    const fromAddress = from.getPublic('hex');
    const to = ec.keyFromPublic(buy.publicKey, "hex");
    const toAddress = to.getPublic('hex');
    const transaction = new Transaction(fromAddress, toAddress, buy.amount);
    transaction.sign(from);
    EKIP.addTransaction(transaction);

    client.sells.delete(orderToBuy.id);
    console.log("buy id: ", buy);
    client.buys.delete(buy.id);
    deleteSell(orderToBuy);
    deleteBuy(buy);

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
        client.sells.set(sell.id, {price: sell.price, amount: sell.amount, total: sell.total, sum: sell.total, privateKey: sell.privateKey, id: sell.id});
    }
}