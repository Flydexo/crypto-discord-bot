const {EKIP, EKP} = require("../../index");
const Transaction = require("../../../blockchain/Transaction");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
const {deleteSell, deleteBuy, addSell, updateDollars, addTrade} = require("../../functions/market");
module.exports = (client, buy, sell = "", isSell = false) => {
    if(buy == "sell"){
        client.buys.filter(b => b.price == sell.price).filter(b => b.amount <= sell.amount).forEach(b => {
            console.log(b);
            client.emit("buy", b, "", true);
        })
        return;
    }

    const orderToBuy = client.sells.filter(s => s.price == buy.price).filter(s => s.amount >= buy.amount).first();
    if(!orderToBuy) return;

    let buyerWallet = "";
    if(isSell){
        buyerWallet = client.wallets.filter(w => w.ekp == buy.publicKey).first(); 
    }else{
        buyerWallet = client.wallets.filter(w => w.ekp == buy.buyer).first(); 
    }
    updateDollars(buyerWallet.doll - buy.total, buyerWallet.ekp);
    if(isSell){
        client.wallets.filter(w => w.ekp == buy.publicKey).first().doll = buyerWallet.doll - buy.total;
    }else{
        client.wallets.filter(w => w.ekp == buy.buyer).first().doll = buyerWallet.doll - buy.total;
    }

    const sellerWallet = client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first(); 
    updateDollars(sellerWallet.doll + buy.total, sellerWallet.ekp);
    client.wallets.filter(w => w.ekp == ec.keyFromPrivate(orderToBuy.privateKey).getPublic('hex')).first().doll = sellerWallet.doll + buy.total;

    const from = ec.keyFromPrivate(orderToBuy.privateKey);
    const fromAddress = from.getPublic('hex');
    let to = "";
    if(isSell){
        to = ec.keyFromPublic(buy.publicKey, "hex");
    }else{
        to = ec.keyFromPublic(buy.buyer, "hex");
    }
    const toAddress = to.getPublic('hex');
    const transaction = new Transaction(fromAddress, toAddress, buy.amount);
    transaction.sign(from);
    EKIP.addTransaction(transaction);

    const trade = {
        timestamp: Date.now(),
        price: buy.price
    };
    addTrade(trade);
    client.trades.push(trade);
    let sum = 0;
    client.trades.forEach(t => sum += t.price);
    const value = sum / client.trades.map(e => e).length;
    console.log("value: ", value);
    EKP.setValue(value);

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