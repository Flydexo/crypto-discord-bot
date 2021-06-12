const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.reward = 100000000;
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
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.reward)
        ];
    }

    addTransaction(transaction){
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