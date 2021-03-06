const Value = require("./Value");
const fs = require('fs');
const path = require("path");

class Currency{

    constructor(){
        this.value = this.getValueFromJson();
        this.marketValue = this.getMarketValueFromJson();
    }

    getValue(){
        return this.value;
    }

    getValueFromJson(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Currency.json"))).value;
    }

    setValue(value){
        this.value = value;
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Currency.json")));
        data.value = this.value;
        fs.writeFileSync(path.join(__dirname, "./database/Currency.json"), JSON.stringify(data, null, 2), err => {
            if(err) throw err;
        })
    }

    getMarketValue(blockchain){
        let value = blockchain.getAllCoins() * this.value;
        this.setMarketValue(value);
        return this.marketValue;
    }

    getMarketValueFromJson(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Currency.json"))).marketValue;
    }

    setMarketValue(value){
        this.marketValue = value;
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Currency.json")));
        data.marketValue = value;
        fs.writeFileSync(path.join(__dirname, "./database/Currency.json"), JSON.stringify(data, null, 2), err => {
            if(err) throw err;
        })
    }

    getPercentage(){
        const prices = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Currency.json"))).prices.hours;
        if(!prices) prices[prices.length - 1].price = this.value;
        return (prices[prices.length - 1].price - this.value) * 100 / prices[prices.length - 1].price;
    }

    getValues(time){
        if(time == "h"){
            return [new Value(0.00999, "date"), new Value(1.15, "date"), new Value(1.50, "date"), new Value(0.0000001, "date")];
        }else if(time == "d"){
            return [new Value(0.00999, "date"), new Value(1.15, "date"), new Value(1.50, "date"), new Value(0.0000001, "date")];
        }else if(time == "w"){
            return [new Value(0.00999, "date"), new Value(1.15, "date"), new Value(1.50, "date"), new Value(0.0000001, "date")];
        }else if(time == "m"){
            return [new Value(0.00999, "date"), new Value(1.15, "date"), new Value(1.50, "date"), new Value(0.0000001, "date")];
        }else if(time == "y"){
            return [new Value(0.00999, "date"), new Value(1.15, "date"), new Value(1.50, "date"), new Value(0.0000001, "date")];
        }
    }
}

module.exports = Currency;