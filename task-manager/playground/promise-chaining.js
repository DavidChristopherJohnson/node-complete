require('../src/db/mongoose');
const User = require('../src/models/user');

const _id = '5f6c693aea2100062736bcc6';

User.findByIdAndUpdate(_id, {
    age: 7
}).then((user) => {
    console.log(user);

    return User.countDocuments({ age: 7 });
}).then((value) => {
    console.log(`Count: ${value}`);
}).catch(e => {
    console.log(e);
});