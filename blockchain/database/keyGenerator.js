const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publickey = key.getPublic('hex');
const private = key.getPrivate('hex');

console.log(`Public: ${publickey}, Private: ${private}`);
