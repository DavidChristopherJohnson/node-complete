const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const forecastToken = 'a8a6892583225a62d894ca10d75a0cc1';
    const url = `https://api.darksky.net/forecast/${forecastToken}/${latitude},${longitude}?units=si`;

    const options = {
        url,
        json: true
    };

    request(options, (error, { statusCode, body }) => {
        if (error) {
            callback("Unable to connect to dark sky services", undefined);
        }
        else if (body.error) {
            callback(`Unable to find location`, undefined);
        }
        else if (statusCode !== 200) {
            callback(`Cannot get weather: ${statusCode} - ${body.message}`, undefined);
        }
        else {
            const daily = body.daily.data;
            const currently = body.currently;

            callback(undefined, `${daily[0].summary} The temperature is currently ${currently.temperature}°C. There is a ${currently.precipProbability * 100}% change of rain.`);
        }
    })
};

module.exports = forecast;