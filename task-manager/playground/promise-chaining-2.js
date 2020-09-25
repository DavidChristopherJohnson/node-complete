require('../src/db/mongoose');
const Task = require('../src/models/task');

const _id = '5f6c70ce27176806cfe979a1';

Task.findByIdAndDelete(_id)
    .then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    }).then((value) => {
        console.log(`Count: ${value}`);
    }).catch(e => {
        console.log(e);
    });