const fetch = require('node-fetch');
const { APP, guild, TOKEN, holder } = require('../config');

const editCommands = (command) => {
    console.log(command);
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
      console.log(json[json.length - 1].options[0].options)

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
            options: command.options,
            default_permission: command.default_permission
        })
    }).then(res => res.json())
    .then(json => {
      console.log(json)
        console.log(json.errors.options['0'].options['0'].name._errors)
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
                    id: "381748591963799553",
                    type: 2,
                    permission: true
                },
                {
                  id: "769993431828660224",
                  type: 2,
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
    //   default_permission: false,
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
    //   default_permission: false,
    //   guild_id: '856606969485066240',
    //   options: [
    //     {
    //       type: 1,
    //       name: 'market',
    //       description: 'Buy a coin to market price',
    //       options: [
    //         {
    //           type: 4,
    //           name: 'amount',
    //           description: 'The amount of coins you want to buy',
    //           required: true
    //         }
    //       ]
    //     },
    //     {
    //       type: 1,
    //       name: 'limit',
    //       description: 'Buy a coin with the price you want',
    //       options: [
    //         {
    //           type: 4,
    //           name: 'amount',
    //           description: 'The amount of coins you want to buy',
    //           required: true
    //         },
    //         {
    //           type: 4,
    //           name: 'price',
    //           description: 'The price you want to buy a coin',
    //           required: true
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: '857338669958823966',
    //   application_id: '856608083953582151',
    //   name: 'orders',
    //   description: "Get the order book",
    //   version: '857338669958823967',
    //   default_permission: false,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857338918701891607',
    //   application_id: '856608083953582151',
    //   name: 'exchange',
    //   description: "Get the basic interface to trade with EKP",
    //   version: '857338918701891608',
    //   default_permission: false,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857340460763054080',
    //   application_id: '856608083953582151',
    //   name: 'chart',
    //   description: "Get the EKP's price's chart",
    //   version: '857368002764996608',
    //   default_permission: false,
    //   guild_id: '856606969485066240',
    //   options: [
    //     {
    //       type: 3,
    //       name: 'time',
    //       description: 'The time you want the chart to include',
    //       required: true,
    //       choices: [
    //           {
    //               name: "hour",
    //               value: "hour"
    //           },
    //           {
    //             name: "day",
    //             value: "day"
    //         },
    //         {
    //             name: "week",
    //             value: "week"
    //         },
    //         {
    //             name: "month",
    //             value: "month"
    //         },
    //         {
    //             name: "year",
    //             value: "year"
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: '857342635277418536',
    //   application_id: '856608083953582151',
    //   name: 'sell',
    //   description: "Add a sell order to the order book",
    //   version: '857342635277418537',
    //   default_permission: false,
    //   guild_id: '856606969485066240'
    // },
    // {
    //   id: '857343135485788181',
    //   application_id: '856608083953582151',
    //   name: 'transaction',
    //   description: 'Make a transaction',
    //   version: '857368002756476969',
    //   default_permission: false,
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
    //   default_permission: false,
    //   guild_id: '856606969485066240'
    // }
    {
      name: 'select_role',
      id: "857700923451244545",
      description: "Add a reaction to message to enable role adding",   
      default_permission: false,
      options: [
        {
          type: 1,
          name: 'button',
          description: 'Buy a coin to market price',
          options: [
            {
              type: 3,
              name: 'message_id',
              description: 'The id of the message you want to add a button',
              required: true
            },
            {
              type: 8,
              name: 'role',
              description: 'The id of the role you want to add',
              required: true
            },
            {
              type: 3,
              name: 'type',
              description: 'The type of butto you want to add',
              required: true,
              choices: [
                {
                  name: "blue",
                  value: "PRIMARY"
                },
                {
                  name: "grey",
                  value: "SECONDARY"
                },
                {
                  name: "green",
                  value: "SUCCESS"
                },
                {
                  name: "red",
                  value: "DANGER"
                },
                {
                  name: "link",
                  value: "LINK"
                }
              ],
            },
            {
              type: 3,
              name: "label",
              description: "The label of the button",
              required: true
            },
            {
              type: 3,
              name: 'emoji_id',
              description: 'The id of the emoji you want to add',
              required: false
            },
          ]
        },
        {
          type: 1,
          name: 'reaction',
          description: 'Buy a coin with the price you want',
          options: [
            {
              type: 3,
              name: 'message_id',
              description: 'The id of the message you want to add a button',
              required: true
            },
            {
              type: 8,
              name: 'role',
              description: 'The id of the role you want to add',
              required: true
            },
            {
              type: 3,
              name: 'emoji_id',
              description: 'The id of the emoji you want to add',
              required: true
            }
          ]
        }
      ]
    },
  ]

// getCommands();
// commands.forEach(c => {
//     setTimeout(() => {
//         editCommands(c)
//     }, 5000)
// })
// let i = 0;
// editCommands(commands[commands.length-1]);
// let interval = setInterval(() => {
//     editCommands(commands[i]);
//     i++;
//     if(i === commands.length - 1) clearInterval(interval);
// }, 5000)

editCommands(commands[0])

// setPerms(commands[0]);