const request = require('request');

const fetchWeather = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/48426f6a7c364d1fa976dd1879cf220d/${latitude},${longitude}`

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to server!')
        } else if (body.error){
            callback('Unable to fetch Location Data!')
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary,
                chance: body.currently.precipProbability,
                high: body.daily.data[0].temperatureHigh,
                low: body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = fetchWeather