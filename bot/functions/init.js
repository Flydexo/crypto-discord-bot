const fs = require("fs");
const path = require('path');
const {Collection} = require('discord.js');

const initEvents = (client) => {
    const categories = fs.readdirSync("./bot/events/");
    categories.forEach(category => {
        const events = fs.readdirSync(`./bot/events/${categories}/`);
        events.forEach(evt => {
            client.on(evt.split(".")[0], require(`../events/${category}/${evt}`).bind(null, client));
        })
    })
}

const initCommands = (client) => {
    client.commands = new Collection();
    const categories = fs.readdirSync('./bot/commands/');
    categories.forEach(category => {
        const commands = fs.readdirSync(`./bot/commands/${category}/`);
        commands.forEach(command => {
            const cmd = require(`../commands/${category}/${command}`);
            client.commands.set(cmd.help.name, cmd);
            console.log("Loaded command: ", cmd.help.name);
        })
    })
}

module.exports = {
    initEvents,
    initCommands
}