const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const Config = require('./db');

const opts = {}

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
console.log("This is form passport config");

opts.secretOrKey = Config.secretKey;
module.exports = passport => {
    console.log("This is from passport config");

    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        console.log("Config: ", jwt_payload);

        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, true)
                }
                return done(null, false)
            })
            .catch(error => {
                console.log("Error on Passport Strategy");

            })
    }))
}