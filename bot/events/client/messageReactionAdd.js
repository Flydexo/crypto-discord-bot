const createUser = require('../../functions/createUser');
const generateKeys = require("../../../blockchain/keyGenerator");
const { guild, holder } = require('../../config');
const fs = require('fs');
const path = require('path');
module.exports = async (client, messageReaction, user) => {
    if(messageReaction.partial){
        await messageReaction.fetch();
        return;
    }
    console.log("reaction");
    if(user.bot) return;
    if(messageReaction.message.content == "🛑 Do you want to create a user ? If done your old user will be deleted if you have one"){
        if(messageReaction.emoji.toString() == "✅"){
            const keys = generateKeys();
            messageReaction.message.channel.send(`This is your private key (do not share it) ||${keys.private}|| and your public key \`${keys.public}\``);
            createUser(user, keys.public);
            client.wallets.set(user.id, {ekp: keys.public, doll: 100});
            client.guilds.cache.get(guild).members.cache.get(user.id).roles.add(holder);
            return messageReaction.message.delete();
        }else {
            messageReaction.message.channel.send("Goodbye ! 👋");
            return messageReaction.message.delete();
        }
    }else{
        console.log("reaction1");
        const reactions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/reactions.json")));
        reactions.forEach(r => {
            if(r.message == messageReaction.message.id && r.emoji == messageReaction.emoji.toString()){
                client.guilds.cache.get(guild).members.cache.get(user.id).roles.add(r.role);
            }
        })
    }
}