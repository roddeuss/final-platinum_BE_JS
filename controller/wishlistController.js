const models = require("../models")

module.exports = {
    createWishlist: (req, res) => {
        let id = req.user.id;
        let data = req.body;

        models.product.findOne({
            where: {
                id: data.product_id
            }
        }).then((product) => {
            if (product) {
                models.wishlist.create({
                    userId: id,
                    productId: data.product_id,
                }).then((wishlist) => {
                    res.status(200).json({
                        message: "Success create wishlist",
                        success: true,
                        data: wishlist
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message,
                        success: false,
                    })
                })
            } else {
                res.status(404).json({
                    message: "wishlist gagal atau product tidak ditemukan",
                    success: false,
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Failed add wishlist",
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
        }).catch((err) => {
            res.status(500).json({
                message: "Failed get wishlist",
                success: false,
            })
        })
    },

    deleteWishlist: (req, res) => {
        models.wishlist.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((wishlist) => {
                if (wishlist) {

                    res.status(200).json({
                        message: "Success delete wishlist",
                        success: true,
                    })
                } else {
                    res.status(500).json({
                        message: "wishlist Gagal",
                        success: false,
                    });
                }
            }).catch((err) => {
                res.status(500).json({
                    message: "failed delete wishlist",
                    success: false,
                })
            })
    }
}