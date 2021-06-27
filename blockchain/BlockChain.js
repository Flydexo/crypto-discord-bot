const Block = require('./Block');
const Transaction = require('./Transaction');
const fs = require("fs");
const path = require('path');
const Contract = require("./Contract");
const { constants } = require('buffer');

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
        return new Block([new Transaction(null, "04cc0fa0177730c519ac0e51a61b8762b1ae786d66fa966c479c36dd934ac872bce237e119d670d60a9185879ab40019d5cbe554c5bb3524821de80df7d643d7f7", 1000000)], Date.now(), "0");
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
            const currentBlockFile = this.chain[i];
            const previousBlock = this.chain[i - 1];
            const currentBlock = new Block(currentBlockFile.transactions, currentBlockFile.timestamp, currentBlockFile.previousHash, null, currentBlockFile.nonce);
            currentBlock.transactions.forEach((t, index) => {
                currentBlock.transactions[index] = new Transaction(t.from, t.to, t.amount, t.signature)
            })

            if(currentBlockFile.previousHash != previousBlock.hash){
                console.log("prevHash");
                return false;
            }

            if(currentBlockFile.hash != currentBlock.createHash()){
                console.log("hash");
                return false;
            }

            if(!currentBlock.hasValidTransactions()){
                console.log("transactions");
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;