const fetch = require('node-fetch');
const { APP, guild, TOKEN } = require('../config');

const getCommands = () => {
    fetch(`https://discord.com/api/applications/${APP}/commands`, {
        headers: {
            "Authorization": `Bot ${TOKEN}`
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
    });
    fetch(`https://discord.com/api/applications/${APP}/guilds/${guild}/commands`, {
        headers: {
            "Authorization": `Bot ${TOKEN}`
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
    });
}

const deleteCommand = (command) => {
    fetch(`https://discord.com/api/applications/${APP}/guilds/${guild}/commands/${command}`, {
        headers: {
            "Authorization": `Bot ${TOKEN}`
        },
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

const setCommand = (command) => {
    fetch(`https://discord.com/api/v8/applications/${APP}/guilds/${guild}/commands`, {
        headers: {
            "Authorization": `Bot ${TOKEN}`,
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            name: command.name,
            description: command.description,
            options: command.options
        })
    }).then(res => res.json())
    .then(json => {
        console.log(json)
        console.log(json.errors.options['0'].choices['0'].value)
    });
}

let command2 = {
    name: "buy",
    description: "Ajouter un ordre d'achat au cahier des ordres",
    options: [
        {
            name: "market",
            description: "Acheter un coin au prix du marché",
            type: 1,
            options: [
                {
                    name: "nombre",
                    description: "Le nombre de coins que vous voulez acheter",
                    required: true,
                    type: 4,
                },
            ]
        },
        {
            name: "limit",
            description: "Acheter un coin à votre prix",
            type: 1,
            options: [
                {
                    name: "prix",
                    description: "Le prix auquel vous voulez acheter un coin",
                    required: true,
                    type: 4,
                },
                {
                    name: "nombre",
                    description: "Le nombre de coins que vous voulez acheter",
                    required: true,
                    type: 4,
                }
            ]
        }
    ]
}

let command3 = {
    name: "orders",
    description: "Voir le carnet d'odres"
}

let command4 = {
    name: "chart",
    description: "Pour voir le graphique du prix de l'EKP",
    options: [
        {
            name: "temps",
            description: "La durée de prix affichés",
            type: 3,
            choices: [
                {
                    name: "hour",
                    value: "hour"
                },
                {
                    name: "day",
                    value: "day"
                },
                {
                    name: "week",
                    value: "week"
                },
                {
                    name: "month",
                    value: "month"
                },
                {
                    name: "year",
                    value: "year"
                }
            ]
        }
    ]
}

let command5 = {
    name: "sell",
    description: "Ajouter un ordre de vente au carnet d'ordres"
}

let command = {
    name: "transaction",
    description: "Effectuer une transaction"
}
// options: command.options
setCommand(command);
// getCommands()
// deleteCommand("857318532839505941")

// 856613651763167232
// 856613093895438346
// 856613521731354675

// /guilds/${guild}/