const createUser = require('../../functions/createUser');
const generateKeys = require("../../../blockchain/keyGenerator");
module.exports = (client, messageReaction, user) => {
    if(user.bot) return;
    if(messageReaction.message.content == "🛑 Do you want to create a user ? If done your old user will be deleted if you have one"){
        if(messageReaction.emoji.toString() == "✅"){
            const keys = generateKeys();
            messageReaction.message.channel.send(`This is your private key (do not share it) ||${keys.private}|| and your public key \`${keys.public}\``);
            createUser(user, keys.public);
            client.wallets.set(user.id, {ekp: keys.public, doll: 100});
            return messageReaction.message.delete();
        }else {
            messageReaction.message.channel.send("Goodbye ! 👋");
            return messageReaction.message.delete();
        }
    }
}