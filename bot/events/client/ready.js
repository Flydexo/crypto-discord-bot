const {initInvites} = require("../../functions/init");
module.exports = (client) => {
    console.log(`Bot ready as ${client.user.tag}`)
    initInvites(client, "852938111255576587");
}