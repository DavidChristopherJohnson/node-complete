const request = require('request');

const geocode = (address, callback) => {
    const mapboxToken = 'pk.eyJ1IjoiZGF2aWRqb2huc29uYW5kIiwiYSI6ImNrNnRkMGFlZjBudWIzbHF2MGFzd3JxNDYifQ.XcBpa42Lq9lslaXNNweMiA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&limit=1`;

    const options = {
        url,
        json: true
    };

    request(options, (error, { statusCode, body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        }
        else if (statusCode !== 200) {
            callback(`Cannot get co-ordinates: ${statusCode} - ${body.message}`, undefined);
        }
        else if (body.features.length === 0) {
            callback(`Cannot find location. Try another search`, undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode;