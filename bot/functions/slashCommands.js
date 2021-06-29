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
      console.log(json)

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
                    id: "859540136043741194",
                    type: 1,
                    permission: true
                }
            ]
        })
    }).then(res => res.json())
    .then(json => {
        console.log(json)
        console.log(json.errors.permissions["0"].permission._errors)
    })
}

const commands = [
    // {
    //   id: '859541210371719168',
    //   application_id: '859540761099763734',
    //   name: 'public',
    //   description: 'Get the public address of the mentionned member',
    //   version: '859556927482888192',
    //   default_permission: false,
    //   guild_id: '858088196797366282',
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
    //   id: '859556948328448010',
    //   application_id: '859540761099763734',
    //   name: 'buy',
    //   description: 'Add a buy order to the order book',
    //   version: '859556948328448011',
    //   default_permission: false,
    //   guild_id: '858088196797366282',
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
    //   id: '859556969286991901',
    //   application_id: '859540761099763734',
    //   name: 'orders',
    //   description: 'Get the order book',
    //   version: '859556969286991902',
    //   default_permission: false,
    //   guild_id: '858088196797366282'
    // },
    // {
    //   id: '859556990359175209',
    //   application_id: '859540761099763734',
    //   name: 'exchange',
    //   description: 'Get the basic interface to trade with EKP',
    //   version: '859556990359175210',
    //   default_permission: false,
    //   guild_id: '858088196797366282'
    // },
    // {
    //   id: '859557011427426324',
    //   application_id: '859540761099763734',
    //   name: 'chart',
    //   description: "Get the EKP's price's chart",
    //   version: '859557011427426325',
    //   default_permission: false,
    //   guild_id: '858088196797366282',
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
    //   id: '859557032415068200',
    //   application_id: '859540761099763734',
    //   name: 'sell',
    //   description: 'Add a sell order to the order book',
    //   version: '859557032415068201',
    //   default_permission: false,
    //   guild_id: '858088196797366282',
    //   options: [
    //     {
    //       type: 1,
    //       name: "market",
    //       description: "Sell to the market price",
    //       options: [
    //         {
    //           type: 3,
    //           name: "private_key",
    //           description: "Your private key",
    //           required: true
    //         },
    //         {
    //           type: 4,
    //           name: "amount",
    //           description: "The amount of cois you want to sell",
    //           required: true
    //         }
    //       ]
    //     },
    //     {
    //       type: 1,
    //       name: "limit",
    //       description: "Sell to the price you want",
    //       options: [
    //         {
    //           type: 3,
    //           name: "private_key",
    //           description: "Your private key",
    //           required: true
    //         },
    //         {
    //           type: 4,
    //           name: "amount",
    //           description: "The amount of cois you want to sell",
    //           required: true
    //         },
    //         {
    //           type: 4,
    //           name: "price",
    //           description: "The price you want to sell a coin",
    //           required: true
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: '859557053496033310',
    //   application_id: '859540761099763734',
    //   name: 'transaction',
    //   description: 'Make a transaction',
    //   version: '859557053496033311',
    //   default_permission: false,
    //   guild_id: '858088196797366282',
    //   options : [
    //     {
    //       type: 3,
    //       name: "private_key",
    //       description: "Your private key",
    //       required: true
    //     },
    //     {
    //       type: 3,
    //       name: "to_address",
    //       description: "The public key where you want to send the coins",
    //       required: true
    //     },
    //     {
    //       type: 4,
    //       name: "amount",
    //       description: "The amout of coins you want to send",
    //       required: true
    //     }
    //   ]
    // },
    // {
    //   id: '859557074282217483',
    //   application_id: '859540761099763734',
    //   name: 'new_wallet',
    //   description: 'Create an EKP wallet',
    //   version: '859557074282217484',
    //   default_permission: true,
    //   guild_id: '858088196797366282'
    // },
    // {
    //   id: '859557095085834271',
    //   application_id: '859540761099763734',
    //   name: 'balance',
    //   description: 'Get your dollar and EKP balance',
    //   version: '859557095085834272',
    //   default_permission: false,
    //   guild_id: '858088196797366282'
    // },
    // {
    //   id: '859557116444672020',
    //   application_id: '859540761099763734',
    //   name: 'select_role',
    //   description: 'Add a reaction to message to enable role adding',
    //   version: '859557116444672021',
    //   default_permission: false,
    //   guild_id: '858088196797366282',
    //   options: [
    //     {
    //       type: 1,
    //       name: 'button',
    //       description: 'Buy a coin to market price',
    //       options: [
    //         {
    //           type: 3,
    //           name: 'message_id',
    //           description: 'The id of the message you want to add a button',
    //           required: true
    //         },
    //         {
    //           type: 8,
    //           name: 'role',
    //           description: 'The id of the role you want to add',
    //           required: true
    //         },
    //         {
    //           type: 3,
    //           name: 'type',
    //           description: 'The type of butto you want to add',
    //           required: true,
    //           choices: [
    //             {
    //               name: "blue",
    //               value: "PRIMARY"
    //             },
    //             {
    //               name: "grey",
    //               value: "SECONDARY"
    //             },
    //             {
    //               name: "green",
    //               value: "SUCCESS"
    //             },
    //             {
    //               name: "red",
    //               value: "DANGER"
    //             },
    //             {
    //               name: "link",
    //               value: "LINK"
    //             }
    //           ],
    //         },
    //         {
    //           type: 3,
    //           name: "label",
    //           description: "The label of the button",
    //           required: true
    //         },
    //         {
    //           type: 3,
    //           name: 'emoji_id',
    //           description: 'The id of the emoji you want to add',
    //           required: false
    //         },
    //         {
    //           type: 3,
    //           name: 'url',
    //           description: 'The url you want to redirect',
    //           required: false
    //         },
    //       ]
    //     },
    //     {
    //       type: 1,
    //       name: 'reaction',
    //       description: 'Buy a coin with the price you want',
    //       options: [
    //         {
    //           type: 3,
    //           name: 'message_id',
    //           description: 'The id of the message you want to add a button',
    //           required: true
    //         },
    //         {
    //           type: 8,
    //           name: 'role',
    //           description: 'The id of the role you want to add',
    //           required: true
    //         },
    //         {
    //           type: 3,
    //           name: 'emoji_id',
    //           description: 'The id of the emoji you want to add',
    //           required: true
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //     id: '859557137406492722',
    //         application_id: '859540761099763734',
    //         name: 'rules',
    //         description: 'Send the rules with a button',
    //         version: '859557137406492723',
    //         default_permission: false,
    //         guild_id: '858088196797366282',
    //     permissions: [
    //         { id: '381748591963799553', type: 2, permission: true },
    //         { id: '769993431828660224', type: 2, permission: true }
    //     ],
    //     options: [
    //       {
    //         type: 8,
    //         name: 'role',
    //         description: 'The role you want to give',
    //         required: true
    //       }
    //     ]
    //   },
    {
        id: '859560315761983528',
        application_id: '859540761099763734',
        name: 'introduce',
        description: 'Introduce yourself with all the members. BE CAREFUL YOU CAN ONLY DO IT ONE TIME',
        version: '859560315761983529',
        default_permission: false,
        guild_id: '858088196797366282',
        options: [
          {
            type: 3,
            name: 'message',
            description: 'Your presentation message',
            required: true
          }
        ]
      }
  ]

// getCommands();


// setCommand(c)

// setCommand(commands[0])

// deleteCommand(commands[0].id)
let i = 0;
// editCommands(commands[commands.length-1]);
// setPerms(commands[commands.length - 1].id)
// setCommand(commands[commands.length - 1])
let interval = setInterval(() => {
    // setCommand(commands[i]);
    setPerms(commands[i].id)
    i++;
    if(i === commands.length) clearInterval(interval);
}, 5000)

// editCommands(commands[0])

// setPerms(commands[0].id);

// setCommand(commands[0])