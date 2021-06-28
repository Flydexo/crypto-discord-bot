module.exports.commands = {
    chart: {
        name: "chart",
        visible: true,
        dm: false,
        file: true
    },
    balance: {
        name: "balance",
        visible: false,
        dm: false,
        embed: true
    },
    buy: {
        name: "buy",
        visible: false,
        dm: false
    },
    exchange: {
        name: "exchange",
        visible: true,
        dm: false,
        embed: true
    },
    new_wallet: {
        name: "new_wallet",
        visible: false,
        dm: false
    },
    orders: {
        name: "orders",
        visible: true,
        dm: false,
        embed: true
    },
    public: {
        name: "public",
        visible: false,
        dm: false
    },
    sell: {
        name: "sell",
        visible: true,
        dm: true,
        usage: "<privateKey> <amount-of-coins> <market/limit price-of-coin>"
    },
    transaction: {
        name: "transaction",
        visible: true,
        dm: true,
        usage: "<privateKey> <toAddress> <amount>"
    },
    select_role: {
        name: "select_role",
        visible: true,
        dm: false,
        wait: true
    },
    select_role_button: {
        name: "select_role_button",
        visible: true,
        dm: false,
        wait: true
    },
    rules: {
        name: "rules",
        visible: true,
        dm: false,
        wait: false
    },
}