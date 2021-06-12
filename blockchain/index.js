const Block = require('./Block');
const BlockChain = require('./BlockChain');
const Transaction = require("./Transaction");

// const myKey = ec.keyFromPrivate('865341fe77414a5403bcecda9ea10d52f7a2d65b4ba3733483aa5343c977b3f2');
// const address = myKey.getPublic('hex');
// const toKey = ec.keyFromPrivate('635047c0cc699ffafd0820d62fd842b57ba0207b2631eca64cd04644c9528057');
// const toAddress = toKey.getPublic('hex');

const EKIP = new BlockChain();

// ekip.minePendingTransaction(address);

// const tx1 = new Transaction(address, toAddress, 667000);
// tx1.sign(myKey);
// ekip.addTransaction(tx1);
// ekip.minePendingTransaction("miner");
// console.log(ekip.chain);

module.exports = EKIP;