module.exports = (client, message) => {
    if(message.author.bot) return;
    if(!message.content.includes("!")) return;
    const args = message.content.slice(1).trim().split(/ +/);
    let command = args.shift();
    if(command == "transaction") {
        command = "dmtransaction"
        const cmd = client.commands.get(command);
        cmd.run(client, message, args);
    }else{
        return;
    }
}