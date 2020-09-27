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


// const jwt = require('jsonwebtoken');

// const myFunction = () => {
//     const token = jwt.sign({ _id: 'abcdefg' }, 'somekey', { expiresIn: "7 Days" });
//     console.log(token);
//     const untoken = jwt.verify(token, 'somekey');
//     console.log(untoken);
// }

// myFunction();