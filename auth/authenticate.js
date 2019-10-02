const passport = require('../auth/config');

const authenticate = () => {
    return passport.authenticate('jwt',
        {
            session: false,
            successRedirect: '/',
            failureRedirect: '/auth/signup',
        });
}

module.exports = authenticate;