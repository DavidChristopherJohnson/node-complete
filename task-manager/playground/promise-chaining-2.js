require('../src/db/mongoose');
const Task = require('../src/models/task');

const _id = '5f2be58900912b0e04b4114d';

// Task.findByIdAndDelete(_id)
//     .then((task) => {
//         console.log(task);
//         return Task.countDocuments({ completed: false });
//     }).then((value) => {
//         console.log(`Count: ${value}`);
//     }).catch(e => {
//         console.log(e);
//     });

const deleteAndCount = async (id) => {
    const deleted = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
};

deleteAndCount(_id)
    .then(count => console.log("Incomplete: ", count))
    .catch(e => console.log("Error: ", e));