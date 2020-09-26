require('../db/mongoose');
const express = require('express');
const Task = require('../models/task');
const { validUpdates, sendResponseOrNotFound } = require('../utilities/router-utilities');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const keys = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]

    if (!validUpdates(keys, allowedUpdates)) {
        return res.status(400).send('Error: Invalid updates!')
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        return sendResponseOrNotFound(task, res);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        return sendResponseOrNotFound(task, res, 204);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        return sendResponseOrNotFound(task, res);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;