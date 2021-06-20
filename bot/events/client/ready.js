const { guild } = require("../../config");
const {initInvites} = require("../../functions/init");
module.exports = (client) => {
    console.log(`Bot ready as ${client.user.tag}`)
    initInvites(client, guild);
}