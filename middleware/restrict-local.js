const passport = require('../lib/passport-local')

// module.exports = passport.authenticate('jwt', {
//     session: false
// })

module.exports = (req, res, next) => {
    // if( req.isAuthenticated() ) return next();
    if( req.isAuthenticated() ) return res.redirect("/");
    res.redirect('/login');
}