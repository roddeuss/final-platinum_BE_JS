const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { user } = require('../models')

async function authenticate(email, password, done) {
    try {
        const userLog = await user.findOne({ where: { email, password}})
        return done(null, userLog)
    } catch (error) {
        console.log(error)
        return done(null, false, {message: error})
    }
}

passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password'}, authenticate)
)

passport.serializeUser(
    (user, done) => done(null, userLog.id)
)
passport.deserializeUser(
    async (id, done) => done(null, await user.findByPk(id))
)

module.exports = passport