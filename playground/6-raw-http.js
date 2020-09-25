const https = require('https');

const url = `https://api.darksky.net/forecast/a8a6892583225a62d894ca10d75a0cc1/40,-75`;

const request = https.request(url, (response) => {
    let data = '';

    //Get data in chunks. Can run multiple times per request so use it to concatenate data
    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    //At the end of the request
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

//Http error handling
request.on('error', (error) => {
    console.log("Error: ", error);
})

request.end();