require('../src/db/mongoose');
const User = require('../src/models/user');

const _id = '5f6c693aea2100062736bcc6';

// User.findByIdAndUpdate(_id, {
//     age: 7
// }).then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 7 });
// }).then((value) => {
//     console.log(`Count: ${value}`);
// }).catch(e => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const countValues = await User.countDocuments({ age });

    return countValues;
}

updateAgeAndCount(_id, 7)
    .then(count => console.log("Count: ", count))
    .catch(e => console.log("Error: ", e));