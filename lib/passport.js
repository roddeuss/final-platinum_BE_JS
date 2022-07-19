const passport = require('passport')
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt')
const { user } = require('../models')

// Passport JTW options
const options = {
    // Extract jwt dari request
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),

    // Harus sama di model User
    secretOrKey: "Ini sangat rahasia", 
}

console.log(options.jwtFromRequest)

passport.use(new JwtStrategy (options, async (payload, done) => {
    console.log(payload)
    if(payload.exp < Date.now()) {
        return done(null, payload)
    }
    user.findOne({
        where: { id: payload.id },
        attributes: { exclude: ["password"] }
    })
    .then((userLog) => {
        console.log(userLog)
        done(null, userLog)
    })
    .catch((err) => {
        done(err, false)
    })
}))

module.exports = passport