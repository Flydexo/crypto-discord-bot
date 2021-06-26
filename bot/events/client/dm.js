const {prefix} = require("../../config");

module.exports = (client, message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    let command = args.shift();
    if(command == "transaction") {
        command = "dmtransaction"
        const cmd = client.commands.get(command);
        cmd.run(client, message, args);
    }else if(command == "sell"){
        command = "dmsell"
        const cmd = client.commands.get(command);
        cmd.run(client, message, args);
    }else if(command == "buy"){
        command = "dmbuy"
        const cmd = client.commands.get(command);
        cmd.run(client, message, args);
    }else{
        return;
    }
}