require('../db/mongoose');
const express = require('express');
const User = require('../models/user');
const { validUpdates, sendResponseOrNotFound } = require('../utilities/router-utilities');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        console.log(user);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);

        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        sendResponseOrNotFound(user, res);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', auth, async (req, res) => {
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

router.delete('/users/:id', auth, async (req, res) => {
    try {
        const user = User.findByIdAndDelete(req.params.id);

        return sendResponseOrNotFound(user, res, 204);
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;