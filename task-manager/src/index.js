const express = require('express');
const TasksRouter = require('./routers/tasks');
const UsersRouter = require('./routers/users');

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(TasksRouter);
app.use(UsersRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
