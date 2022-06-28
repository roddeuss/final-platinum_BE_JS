const router = require("express").Router();

const wishlist = require('../controller/wishlistController')
const restrict = require('../middleware/restrict')

router
    .post("/wishlist", restrict, wishlist.createWishlist)
    .get('/wishlist', restrict, wishlist.getWishlist)
    .delete('/wishlist/:id', restrict, wishlist.deleteWishlist)

module.exports = router