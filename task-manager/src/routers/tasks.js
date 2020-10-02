require('../db/mongoose');
const express = require('express');
const Task = require('../models/task');
const { validUpdates, sendResponseOrNotFound, saveItem } = require('../utilities/router-utilities');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const options = {}

    if (req.query.completed) {
        match.completed = req.query.completed.toLowerCase() === 'true';
    }

    if (req.query.limit) {
        options.limit = parseInt(req.query.limit);
        options.skip = parseInt(req.query.skip || 0);
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options
        }).execPopulate();

        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        return sendResponseOrNotFound(task, res);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const keys = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]

    if (!validUpdates(keys, allowedUpdates)) {
        return res.status(400).send('Error: Invalid updates!')
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        keys.forEach(key => task[key] = req.body[key]);
        await task.save();

        return res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        return sendResponseOrNotFound(task, res, 204);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;