const Value = require("./Value");
const fs = require('fs');
const path = require("path");

class Currency{

    constructor(){
        this.value = this.getValueFromJson();
    }

    getValue(){
        return this.value;
    }

    getValueFromJson(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Currency.json"))).value;
    }

    setValue(value){
        this.value = value;
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../database/Currency.json")));
        data.value = this.value;
        fs.writeFileSync(path.join(__dirname, "../database/Currency.json"), JSON.stringify(data, null, 2), err => {
            if(err) throw err;
        })
    }

    getPercentage(){
        let truefalse = Math.round(Math.random()*100) <= 50 ? true : false;
        if(truefalse){
            return 20;
        }else{
            return -10;
        }
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