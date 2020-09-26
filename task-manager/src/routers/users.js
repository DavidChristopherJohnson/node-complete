require('../db/mongoose');
const express = require('express');
const User = require('../models/user');
const { validUpdates, sendResponseOrNotFound } = require('../utilities/router-utilities');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        sendResponseOrNotFound(user, res);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const keys = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    if (!validUpdates(keys, allowedUpdates)) {
        return res.status(400).send('Error: Invalid updates!')
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        keys.forEach(update => user[update] = req.body[update]);
        await user.save();

        return res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = User.findByIdAndDelete(req.params.id);

        return sendResponseOrNotFound(user, res, 204);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;