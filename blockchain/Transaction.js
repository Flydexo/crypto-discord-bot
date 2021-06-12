const sha256 = require('crypto-js/sha256');
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
class Transaction{
    constructor(from, to, amount){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.signature = "";
    }

    hash(){
        return sha256(this.from + this.to + this.amount).toString();
    }

    sign(signingKey){
        if(signingKey.getPublic('hex') !== this.from){
            console.log(this.from);
            throw "you cannot use other key";
        }
        const hashTx = this.hash();
        const sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER('hex');
    }

    isValid(){
        if(this.from == null) return true;

        if(!this.signature || this.signature.length === 0){
            throw "too short";
        }

        const publicKey = ec.keyFromPublic(this.from, "hex");
        return publicKey.verify(this.hash(), this.signature);
    }
}

module.exports = Transaction;