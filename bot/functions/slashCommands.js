const fetch = require('node-fetch');
const { APP, guild, TOKEN, holder } = require('../config');
let commands = [];

const editCommands = (command) => {
    console.log(command.id);
    command.default_permissions = false;
    fetch(`https://discord.com/api/applications/${APP}/guilds/${guild}/commands/${command.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bot ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(command)
    }).then(res => res.json())
    .then(json => console.log(json));
}

const getCommands = () => {
    fetch(`https://discord.com/api/applications/${APP}/commands`, {
        headers: {
            "Authorization": `Bot ${TOKEN}`
        }
    })
    .then(res => res.json())
    .then(json => {
        
    });
    fetch(`https://discord.com/api/applications/${APP}/guilds/${guild}/commands`, {
        headers: {
            "Authorization": `Bot ${TOKEN}`
        }
    })
    .then(res => res.json())
    .then(json => {
        commands.push(json)
    console.log(commands)

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

const setPerms = (command) => {
    fetch(`https://discord.com/api/v8/applications/${APP}/guilds/${guild}/commands/${command}/permissions`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bot ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            permissions: [
                {
                    id: holder,
                    type: 1,
                    permission: true
                }
            ]
        })
    }).then(res => res.json())
    .then(json => {
        console.log(json)
        console.log(json.errors._errors)
    })
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

let command6 = {
    name: "transaction",
    description: "Effectuer une transaction"
}

let command7 = {
    name: "new_wallet",
    description: "Créer un porte-feuille EKP"
}

let command = {
    name: "balance",
    description: "Voir votre porte-feuille"
}
// options: command.options
// setCommand(command);
getCommands();
// setTimeout(() => {
//     commands[0].forEach(c => {
//         setTimeout(() => {
//             editCommands(c);
//         }, 500)
//     })
// }, 2000)
// setTimeout(() => {
//     setPerms("857335720242315324");
//     setPerms("857338669958823966");
//     setPerms("857338918701891607");
//     setPerms("857340460763054080");
// }, 500)
// setTimeout(() => {
//     setPerms("857342635277418536");
//     setPerms("857343135485788181");
//     setPerms("857319079026491402");
//     setPerms("857362707782696989");
// }, 500)
// deleteCommand("857313172733558844")
// deleteCommand("857317589550366780")

// 856613651763167232
// 856613093895438346
// 856613521731354675

// /guilds/${guild}/