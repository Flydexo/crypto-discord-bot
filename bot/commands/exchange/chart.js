const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const {MessageAttachment} = require("discord.js");
const fs = require("fs");
const path = require('path');

module.exports.run = (client, message, args) => {
    const types = ["y", "year", "month", "m", "week", "w", "day", "d", "hour", "h"];
    let type = args[0];
    if(!types.includes(type)) type = "w"
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../blockchain/database/Currency.json"))).prices;
    function getLabels(){
        if(type == "y" || type == "year") return jsonData.years.map(w => w.year).reverse().slice(0, 10).reverse()
        if(type == "m" || type == "month") return jsonData.months.map(w => w.month).reverse().slice(0, 10).reverse()
        if(type == "w" || type == "week") return jsonData.weeks.map(w => w.week).reverse().slice(0, 10).reverse()
        if(type == "d" || type == "day") return jsonData.days.map(w => w.day).reverse().slice(0, 10).reverse()
        if(type == "h" || type == "hour") return jsonData.hours.map(w => w.hour).reverse().slice(0, 10).reverse()
    }
    function getData(){
        if(type == "y" || type == "year") return jsonData.years.map(w => w.price).reverse().slice(0, 10).reverse()
        if(type == "m" || type == "month") return jsonData.months.map(w => w.price).reverse().slice(0, 10).reverse()
        if(type == "w" || type == "week") return jsonData.weeks.map(w => w.price).reverse().slice(0, 10).reverse()
        if(type == "d" || type == "day") return jsonData.days.map(w => w.price).reverse().slice(0, 10).reverse()
        if(type == "h" || type == "hour") return jsonData.hours.map(w => w.price).reverse().slice(0, 10).reverse()
    }
    const width = 600; //px
    const height = 400; //px
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    (async () => {
        const data = {
            labels: getLabels(),
            datasets: [{
                label: "EKP Price", 
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: getData()
            }]
        };
        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.restore();
            }
        }
        const configuration = {
           type: "line",
           data,
           plugins: [plugin]
        };
        const image = await chartJSNodeCanvas.renderToBuffer(configuration);
        const attach = new MessageAttachment(image);
        message.channel.send(attach);
    })();
}

module.exports.help = {
    name: "chart"
}