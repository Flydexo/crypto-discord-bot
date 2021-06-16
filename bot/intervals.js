const {EKP} = require("./index");
const moment = require('moment');
const fs = require('fs');
const path = require("path");

const startIntervals = () => {
    setInterval(() => {
        const value = EKP.getValue();
        console.log("get hour value: ",  value);
        let now = moment(Date.now());
        let hour = now.format("DD/MM/YYYY:H");
        let moments = hour.split('/');
        let day = moments[0];
        let month = moments[1];
        let year = moments[2].split(":")[0];
        console.log(day, month, year);
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../blockchain/database/Currency.json")));
        if(data.prices.days[data.prices.days.length - 1].day.split('/')[0] != day){
            let price = 0;
            let sum = 0;
            data.prices.hours.forEach(h => {
                if(h.hour.split('/')[0] == day){
                    sum++;
                    price += h.price;
                }
            })
            if(sum === 0){
                price = value;
                sum = 1;
            }
            price /= sum;
            data.prices.days.push({
                day: now.format("DD/MM/YYYY"),
                price: price
            })
            if(data.prices.months[data.prices.days.length - 1].day.split('/')[1] != month){
                price = 0;
                sum = 0;
                data.prices.days.forEach(h => {
                    if(h.day.split('/')[1] == month){
                        sum++;
                        price += h.price;
                    }
                })
                if(sum === 0){
                    price = value;
                    sum = 1;
                }
                price /= sum;
                data.prices.months.push({
                    month: now.format("MM/YYYY"),
                    price: price
                })
            }
        }
        data.prices.hours.push({hour: hour, price: value});
        fs.writeFileSync(path.join(__dirname, "../blockchain/database/Currency.json"), JSON.stringify(data, null, 2), err => {
            if(err) throw err;
        })
    }, 10000);
}

module.exports = startIntervals;