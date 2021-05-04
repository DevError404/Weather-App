const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXBvb3J2YTc4NiIsImEiOiJja2tqb3V6MXMxemZmMndxdDlicXBrZmVlIn0.AFP-kWCrC394RrLLq-C6Fg&limit=1'
    request({ url, json: true}, (error, { body }) => {
        if(error)
        {
            callback('Unable to connect the request!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode