const {channels} = require("../../config")
module.exports = (client, member) => {
    console.log(`${member.user.tag}, left`);
}