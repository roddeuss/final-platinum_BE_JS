const models = require("../models")

module.export = {
    createTawar: (req, res) => {
        let id = req.user.id;
        let data = req.body;

        models.product.findOne({
            where: {
                userId: id
            }
        }).then((product) => {
            if(product) {
                models.tawar.create({
                    userId: id,
                    productId : productId,
                    price: price,
                }).then((tawar) => {
                    res.status(200).json({
                        message: "Success create tawar",
                        success: true,
                        data:tawar
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: err.message,
                        success: false,
                    })
                })
            } else {
                res.status(500).json({
                    message: "Tawar Tidak Berhasil",
                    success: false
                })
            }
        }).catch((err) => {
            res.status(500).json({
                message: "Gagal Tawar",
                success: false,
            })
        })
    },
    getTawar: (req, res) => {
        models.tawar.findAll({
            where: {
                userId : req.user.id
            },
            include: [
                {
                    model: models.product, as: "product",
                },
            ],
        }).then((result) => {
            res.status(200).json({
                message: "success get tawar",
                success: true,
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                message: "failed get tawar",
                success: false,
            })
        })
    }
}