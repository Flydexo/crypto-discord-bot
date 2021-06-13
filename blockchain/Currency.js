const Value = require("./Value");

class Currency{

    getValue(money){
        if(money == "$"){
            return 0.00999
        }
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