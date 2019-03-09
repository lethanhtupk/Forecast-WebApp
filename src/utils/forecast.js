const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/11b3b2472245fb03a86ba62392568daf/' + latitude + ',' + longitude;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }
        else if(body.error){
            callback("Unable to find infomation", undefined);
        }
        else {
            callback(undefined, {
                daily: body.daily,
                timestamp: body.currently.time,
                summary: body.currently.summary,
                temperature: Math.round((body.currently.temperature-32)/1.8),
                humidity: Math.round(body.currently.humidity*100),
                windSpeed: Math.round(body.currently.windSpeed* 1,61),
                visibility: Math.round(body.currently.visibility* 1.61)
            })
        }
    })
}

module.exports = forecast;
