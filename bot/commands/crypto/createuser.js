module.exports.run = (client, message, args) => {
    message.author.send("🛑 Do you want to create a user ? If done your old user will be deleted if you have one").then(msg => {
        msg.react("✅")
        .then(() => {
            msg.react("❌")
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    })
}

module.exports.help = {
    name: "createuser"
}