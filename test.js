const moment = require("moment");

let year = "";
let month = "";
let week = "";
let day = "";
let hour = "";

const now = moment(Date.now());
year = now.format("YYYY");
month = now.format("MM/YYYY");
week = now.format("DD/MM/YYYY");
day = now.format("DD/MM/YYYY");
hour = now.format("DD/MM/YYYY:H");

console.log(year, month, week, day, hour);