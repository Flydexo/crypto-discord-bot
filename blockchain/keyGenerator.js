const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

function gen(){
    const key = ec.genKeyPair();
    const publickey = key.getPublic('hex');
    const private = key.getPrivate('hex');

    const result = {
        public: publickey,
        private: private
    }

    return result;
}

module.exports = gen;