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

router.patch('/users/me', auth, async (req, res) => {
    const keys = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]

    if (!validUpdates(keys, allowedUpdates)) {
        return res.status(400).send('Error: Invalid updates!')
    }

    try {
        keys.forEach(update => req.user[update] = req.body[update]);

        await req.user.save();
        return res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(204).send()
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;