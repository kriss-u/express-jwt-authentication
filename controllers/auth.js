const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { salt_rounds, secret, expires_in, issuer, audience } = require('../auth/constants');

exports.signup = async (req, res, next) => {
    user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).send({ message: 'User already exists' });
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!password || password < 6) {
        return res.status(422).send({ message: 'Provide password at least of length 6' });
    }
    bcrypt.hash(password, salt_rounds, async (err, hash) => {
        if (err) {
            return res.status(422).send(err);
        }
        const newUser = new User({
            name: name,
            email: email,
            password: hash
        });
        await newUser.save((err, user) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.send(user);
        });
    });
}

exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send({ message: 'Please fill all the fields before submitting!' });
    }
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
            return res.status(422).send(err);
        } else if (response) {
            return res.send({
                token: 'Bearer ' + jwt.sign({ email: email }, secret, {
                    expiresIn: expires_in,
                    issuer: issuer,
                    audience: audience,
                })
            });
        } else {
            return res.status(401).send({ message: 'Password didn\'t match!' });
        }

    });
}