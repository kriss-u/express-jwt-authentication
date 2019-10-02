const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const { secret, expires_in, issuer, audience } = require('./constants');

const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;
jwtOptions.expiresIn = expires_in;
jwtOptions.issuer = issuer;
jwtOptions.audience = audience;

passport.use(new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    console.log('Payload: ', jwt_payload);
    User.findOne({ 'email': jwt_payload.email }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

}));

module.exports = passport;
