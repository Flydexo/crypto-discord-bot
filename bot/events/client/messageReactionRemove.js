const { guild } = require('../../config');
const fs = require('fs');
const path = require('path');
module.exports = async (client, messageReaction, user) => {
    if(messageReaction.partial){
        await messageReaction.fetch();
        return;
    }
    if(user.bot) return;
    const reactions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/reactions.json")));
    reactions.forEach(r => {
        if(r.message == messageReaction.message.id && r.emoji == messageReaction.emoji.toString()){
            client.guilds.cache.get(guild).members.cache.get(user.id).roles.remove(r.role);
        }
    })
}