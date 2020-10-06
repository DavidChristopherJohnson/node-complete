const express = require('express');
const TasksRouter = require('./routers/tasks');
const UsersRouter = require('./routers/users');

const app = express();

app.use(express.json());
app.use(TasksRouter);
app.use(UsersRouter);

module.exports = app;