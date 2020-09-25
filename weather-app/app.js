const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if (process.argv.length < 2 || !process.argv[2]) {
    console.log("Please provide an address");
    return;
}

geocode(process.argv[2], (error, { latitude, longitude, location }) => {
    if (error) {
        console.log(error);
        return;
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(location);
        console.log(forecastData);
    });
});
