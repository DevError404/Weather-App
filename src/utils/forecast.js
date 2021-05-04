const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8797e05e6d360a58db75496dfa64197c&query=' + latitude + ',' + longitude
    request({ url, json: true}, (error, { body }) => {
        if(error)
        {
            callback('Unable to connect the request!', undefined)
        } else if ( body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
            
        }
   
    })
}

module.exports = forecast