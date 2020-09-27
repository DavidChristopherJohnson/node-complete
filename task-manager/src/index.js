const express = require('express');
const TasksRouter = require('./routers/tasks');
const UsersRouter = require('./routers/users');

const app = express();
const port = process.env.port || 3000;
const isMaintanceMode = process.env.isMaintanceMode || false;

//Maintenance code
// app.use((req, res, next) => {
//     if (isMaintanceMode) {
//         res.status(503).send('The site is undergoing maintenance')
//     }
//     else {
//         next();
//     }
// })

app.use(express.json());
app.use(TasksRouter);
app.use(UsersRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const myFunction = async () => {
//     // const task = await Task.findById('5f7089f561dcba0e2a684678');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);
//     const user = await User.findById('5f708985c580bc0de15f4b06');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// myFunction();