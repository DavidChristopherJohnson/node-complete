require('./db/mongoose');
const express = require('express');
const Task = require('./models/task');
const User = require('./models/user');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.patch('/users/:id', async (req, res) => {
    const keys = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    if (!validUpdates(keys, allowedUpdates)) {
        return res.status(400).send('Error: Invalid updates!')
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const keys = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]

    if (!validUpdates(keys, allowedUpdates)) {
        return res.status(400).send('Error: Invalid updates!')
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

const validUpdates = (keys, allowedFields) => keys.every(key => allowedFields.includes(key));