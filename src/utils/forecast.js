const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast