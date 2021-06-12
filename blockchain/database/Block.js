const sha256 = require('crypto-js/sha256')

class Block{
    constructor(transactions, timestamp, previousHash = ""){
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.hash = this.createHash();
        this.previousHash = previousHash;
        this.nonce = 0;
    }

    createHash(){
        return sha256(`${JSON.stringify(this.transactions)} ${this.timestamp} ${this.previousHash} ${this.nonce}`).toString();
    }

    mine(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.createHash();
        }
    }

    hasValidTransactions(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }

        return true;
    }
}

module.exports = Block;