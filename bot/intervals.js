const {EKP} = require("./index");
const moment = require('moment');
const fs = require('fs');
const path = require("path");

const startIntervals = () => {
    setInterval(() => {
        const value = EKP.getValue();
        let now = moment(Date.now());
        let hour = now.subtract(1, "hour").format("DD/MM/YYYY:H");
        let day = now.subtract(1, "day").format("DD/MM/YYYY");
        let week = now.subtract(1, "week").format("ww/MM/YYYY");
        let month = now.subtract(1, "month").format("ww/MM/YYYY");
        let year = now.subtract(1, "year").format("YYYY");
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../blockchain/database/Currency.json")));
        if(data.prices.hours[data.prices.hours.length - 1].hour != hour){
            data.prices.hours.push({hour: hour, price: value});
        }
        if(data.prices.days[data.prices.days.length - 1].day != day){
            let price = 0;
            let sum = 0;
            data.prices.hours.forEach(h => {
                if(h.hour.split('/').slice(0, 2).join('/') == day){
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
                day: day,
                price: price
            })
        }
        if(data.prices.weeks[data.prices.weeks.length - 1].week != week){
            price = 0;
            sum = 0;
            data.prices.days.forEach(h => {
                if(h.day.split('/')[1] == week.split('/')[0]){
                    sum++;
                    price += h.price;
                }
            })
            if(sum === 0){
                price = value;
                sum = 1;
            }
            price /= sum;
            data.prices.weeks.push({
                week: week,
                price: price
            })
        }
        if(data.prices.months[data.prices.months.length - 1].month != month){
            price = 0;
            sum = 0;
            data.prices.weeks.forEach(h => {
                if(h.week.split('/')[1] == month.split("/")[1] && h.week.split('/')[2] == month.split("/")[2]){
                    console.log('sum', h.week, month);
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
                month: month,
                price: price
            })
        }
        if(data.prices.years[data.prices.years.length - 1].year != year){
            price = 0;
            sum = 0;
            data.prices.months.forEach(h => {
                if(h.month.split('/')[2] == year){
                    sum++;
                    price += h.price;
                }
            })
            if(sum === 0){
                price = value;
                sum = 1;
            }
            price /= sum;
            data.prices.years.push({
                year: year,
                price: price
            })
        }
        fs.writeFileSync(path.join(__dirname, "../blockchain/database/Currency.json"), JSON.stringify(data, null, 2), err => {
            if(err) throw err;
        })
    }, 3600000);
}

module.exports = startIntervals;