const models = require("../models")

module.exports = {
    createTawar: (req, res) => {
        let id = req.user.id;
        
        models.product.findOne({
            where: {
                userId: id
            }
        }).then((product) => {
            if (product) {
                models.tawar.create({
                    userId: id,
                    productId: req.body.productId,
                    price: price,
                }).then((tawar) => {
                    res.status(200).json({
                        message: "Success create tawar",
                        success: true,
                        data: tawar
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message,
                        success: false,
                    })
                })
            } else {
                res.status(500).json({
                    message: "tawar Gagal",
                    success: false,
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Failed add tawar",
                success: false,
            })
        })
    },
    getTawar: (req, res) => {
        models.tawar.findAll({
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
                message: "Success get tawar",
                success: true,
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Failed get tawar",
                success: false,
            })
        })
    },
}