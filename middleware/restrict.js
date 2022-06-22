const passport = require('../lib/passport')

module.exports = passport.authenticate('jwt', {
    session: false
})