const models = require("../models")

module.exports = {
    createWishlist: (req, res) => {
        let id = req.user.id;
        let data = req.body;

        models.product.findOne({
            where: {
                userId: id
            }
        }).then((product) => {
            if (product) {
                models.wishlist.create({
                    userId: id,
                    productId: data.product_id,
                }).then((wishlist) => {
                    res.status(200).json({
                        message: "wishlist Bershasil",
                        success: true,
                        data: wishlist
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message,
                        success: false,
                    })
                })
            }
        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            })
        })
    },
    getWishlist: (req, res) => {
        models.wishlist.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: models.product, as: "product",
                },
            ],
        }).then((result) => {
            res.status(200).json({
                message: "Success get wishlist",
                success: true,
                data: result,
            })
        })
    }
}