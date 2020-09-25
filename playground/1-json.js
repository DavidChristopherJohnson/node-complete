const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
let dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = "David";
data.age = 34;

dataJSON = JSON.stringify(data);
fs.writeFileSync('1-json.json', dataJSON);
