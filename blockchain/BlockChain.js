const Block = require('./Block');
const Transaction = require('./Transaction');
const fs = require("fs");
const path = require('path');

class Blockchain{
    constructor(){
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Blockchain.json")));
        if(data.length < 1){
            this.chain = [this.createGenesisBlock()];
        }else{
            this.chain = data;
        }
        this.pendingTransactions = [];
        this.reward = 0.01;
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block([], Date.now(), "0");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress){
        let block = new Block(this.pendingTransactions, Date.now(), this.chain[this.chain.length - 1].hash);
        block.mine(this.difficulty);
        this.chain.push(block);
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Blockchain.json")));
        data.push(this.chain[this.chain.length - 1]);
        fs.writeFileSync(path.join(__dirname, "./database/Blockchain.json"), JSON.stringify(data, null, 2), (err) => {
            if(err) throw err;
        })
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.reward)
        ];
    }

    addTransaction(transaction){
        if(this.getBalance(transaction.from) < transaction.amount){
            return "insufficient funds";
        }

        if(!transaction.from || !transaction.to){
            throw "from and to address"
        }

        if(!transaction.isValid()){
            throw "not valid"
        }

        this.pendingTransactions.push(transaction);
        console.log(transaction);
    }

    getBalance(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(address == trans.from){
                    balance -= trans.amount;
                }else if(address == trans.to){
                    balance += trans.amount;
                }
            }
        }
        for(const transaction of this.pendingTransactions){
            if(address == transaction.from){
                balance -= transaction.amount;
            }else if(address == transaction.to){
                balance += transaction.amount;
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }

            if(currentBlock.hash != currentBlock.createHash()){
                return false;
            }

            if(!currentBlock.hasValidTransactions()){
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;