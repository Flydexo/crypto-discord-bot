const fs = require('fs');
const path = require("path");

const addSell = (sell) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));
    data.sells.push(sell);
    fs.writeFileSync(path.join(__dirname, '../data/market.json'), JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.error(err);
        }
    })
}

const addBuy = (buy) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/market.json')));
    data.buys.push(buy);
    fs.writeFileSync(path.join(__dirname, '../data/market.json'), JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.error(err);
        }
    })
}

module.exports = {
    addSell,
    addBuy
}