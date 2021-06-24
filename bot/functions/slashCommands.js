const fetch = require('node-fetch');
const { APP, guild, TOKEN, holder } = require('../config');

const editCommands = (command) => {
    console.log(command.id);
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

const commands = [
    // {
    //   id: '857319079026491402',
    //   application_id: '856608083953582151',
    //   name: 'public',
    //   description: "Get the public address of the mentionned member",
    //   version: '857368002730393670',
    //   default_permission: true,
    //   guild_id: '856606969485066240',
    //   options: [
    //     {
    //       type: 6,
    //       name: 'membre',
    //       description: "The member who you want to get his public address",
    //       required: true
    //     }
    // ]
    // },
    // {
    //   id: '857335720242315324',
    //   application_id: '856608083953582151',
    //   name: 'buy',
    //   description: "Add a buy order to the order book",   
    //   version: '857368002487648277',
    //   default_permission: true,
    //   guild_id: '856606969485066240',
    //   options: [
    //     {
    //       type: 1,
    //       name: 'market',
    //       description: 'Buy a coin to market price',
    //     },
    //     {
    //       type: 1,
    //       name: 'limit',
    //       description: 'Buy a coin with the price you want',
    //     }
    //   ]
    // },
    // {
    //   id: '857338669958823966',
    //   application_id: '856608083953582151',
    //   name: 'orders',
    //   description: "Get the order book",
    //   version: '857338669958823967',
    //   default_permission: true,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857338918701891607',
    //   application_id: '856608083953582151',
    //   name: 'exchange',
    //   description: "Get the basic interface to trade with EKP",
    //   version: '857338918701891608',
    //   default_permission: true,
    //   guild_id: '856606969485066240'
    // },
    {
      id: '857340460763054080',
      application_id: '856608083953582151',
      name: 'chart',
      description: "Get the EKP's price's chart",
      version: '857368002764996608',
      default_permission: true,
      guild_id: '856606969485066240',
      options: [
        {
          type: 3,
          name: 'time',
          description: 'The time you want the chart to include',
          required: true,
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
    },
    // {
    //   id: '857342635277418536',
    //   application_id: '856608083953582151',
    //   name: 'sell',
    //   description: "Add a sell order to the order book",
    //   version: '857342635277418537',
    //   default_permission: true,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857343135485788181',
    //   application_id: '856608083953582151',
    //   name: 'transaction',
    //   description: 'Make a transaction',
    //   version: '857368002756476969',
    //   default_permission: true,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857362543176581150',
    //   application_id: '856608083953582151',
    //   name: 'new_wallet',
    //   description: 'Create an EKP wallet',
    //   version: '857362543176581151',
    //   default_permission: true,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857362707782696989',
    //   application_id: '856608083953582151',
    //   name: 'balance',
    //   description: 'Get your dollar and EKP balance',
    //   version: '857368002776924170',
    //   default_permission: true,
    //   guild_id: '856606969485066240'
    // }
  ]

// getCommands();
// commands.forEach(c => {
//     setTimeout(() => {
//         editCommands(c)
//     }, 5000)
// })
let i = 0;
let interval = setInterval(() => {
    editCommands(commands[i]);
    i++;
    if(i === commands.length - 1) clearInterval(interval);
}, 5000)
