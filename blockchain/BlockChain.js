const Block = require('./Block');
const Transaction = require('./Transaction');
const fs = require("fs");
const path = require('path');
const Contract = require("./Contract");

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
        this.pendingContracts = [];
    }

    createGenesisBlock(){
        return new Block([new Transaction(null, "049a859c2697b8cfe7af3b19d6c7b11e0b1a641048c3b4ab8bc1183750da35dfbb82da50c12f5e193ae2ac21b4101fcaf8c6e44b297e27f1363c831c00f7cde2ca", 1000000)], Date.now(), "0");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress, client){
        let block = new Block(this.pendingTransactions, Date.now(), this.chain[this.chain.length - 1].hash, this.pendingContracts);
        block.mine(this.difficulty);
        this.chain.push(block);
        client.emit("block", block);
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Blockchain.json")));
        data = this.chain;
        fs.writeFileSync(path.join(__dirname, "./database/Blockchain.json"), JSON.stringify(data, null, 2), (err) => {
            if(err) throw err;
        })
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.reward)
        ];
    }

    addTransaction(transaction){
       if(transaction.from != null){
            if(this.getBalance(transaction.from) < transaction.amount){
                return "insufficient funds";
            }

            if(!transaction.from || !transaction.to){
                throw "from and to address"
            }

            if(!transaction.isValid()){
                throw "not valid"
            }
       }

        this.pendingTransactions.push(transaction);
    }

    addContract(contract){
        if(typeof contract != Contract) return;
        this.pendingContracts.push(contract);
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
        // for(const transaction of this.pendingTransactions){
        //     if(address == transaction.from){
        //         balance -= transaction.amount;
        //     }else if(address == transaction.to){
        //         balance += transaction.amount;
        //     }
        // }
        return balance;
    }

    getAllCoins(){
        let coins = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.from == null){
                    coins += trans.amount;
                }
            }
        }
        return coins;
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