const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys");
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await User.findById(jwt_payload.id);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}