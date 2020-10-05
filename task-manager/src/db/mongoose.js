const mongoose = require('mongoose');

const connectionURL = process.env.CONNECTION_STRING;

const connectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

mongoose.connect(connectionURL, connectionOptions);
