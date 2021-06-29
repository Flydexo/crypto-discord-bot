const { guild, channels } = require("../../config");
const {initInvites} = require("../../functions/init");
module.exports = (client) => {
    console.log(`Bot ready as ${client.user.tag}`)
    initInvites(client, guild);
    client.user.setPresence({
        status: "online",
        afk: false,
        activity : {
            name: "EKP price",
            type: "WATCHING",
            url: "https://discord.gg/M7qTWUMVRQ"
        }
    })
}