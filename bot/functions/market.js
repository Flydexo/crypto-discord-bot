const fs = require('fs');
const path = require("path");

const addSell = (sell) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));
    sell.id = data.sells.length;
    data.sells.push(sell);
    fs.writeFileSync(path.join(__dirname, '../data/market.json'), JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.error(err);
        }
    })
}

const addBuy = (buy) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));
    buy.id = data.buys.length;
    data.buys.push(buy);
    fs.writeFileSync(path.join(__dirname, '../data/market.json'), JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.error(err);
        }
    })
}

const deleteSell = (sell) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));
    data.sells.forEach((b, index) => {
        console.log(b.id == sell.id ? true : false, sell.id);
        if(b.id == sell.id) data.sells.splice(index, 1);
        return
    });
    fs.writeFileSync(path.join(__dirname, '../data/market.json'), JSON.stringify(data, null, 2), err => {
        if(err) console.error(err);
    })
}

const deleteBuy = (buy) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));
    data.buys.forEach((b, index) => {
        if(b.id == buy.id) data.buys.splice(index, 1);
        return
    });
    fs.writeFileSync(path.join(__dirname, '../data/market.json'), JSON.stringify(data, null, 2), err => {
        if(err) console.error(err);
    })
}

const updateDollars = (dollars, address) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    data.forEach((b, index) => {
        if(b.address == address) b.dWallet = dollars;
        return
    });
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(data, null, 2), err => {
        if(err) console.error(err);
    })
}

module.exports = {
    addSell,
    addBuy,
    deleteSell,
    deleteBuy,
    updateDollars
}