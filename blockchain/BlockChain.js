const Block = require('./Block');
const Transaction = require('./Transaction');
const fs = require("fs");
const path = require('path');

class Blockchain{
    constructor(){
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, "./database/Blockchain.json")));
        if(data.length < 1){
            console.log("chain < 1");
            this.chain = [this.createGenesisBlock()];
        }else{
            console.log("chain > 1");
            this.chain = data;
        }
        console.log(this.chain);
        this.pendingTransactions = [];
        this.reward = 0.01;
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block([new Transaction(null, "048d02c356d369824eaa7ae9a80fc08fd8e5044cd1300b7fdfab25e7c9e425b7203fea2e8728596bdbbdf9e3c2faf61005d4fa24d6ad7a24eba1c368ed95e54b30", 1000000)], Date.now(), "0");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress){
        let block = new Block(this.pendingTransactions, Date.now(), this.chain[this.chain.length - 1].hash);
        block.mine(this.difficulty);
        this.chain.push(block);
        console.log(this.chain);
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