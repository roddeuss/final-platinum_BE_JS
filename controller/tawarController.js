const models = require("../models")

module.exports = {
    createTawar: (req, res) => {
        const{userId, productId, price} = req.body
        let id = req.user.id;
        
        models.product.findOne({
            where: {
                id: productId
            }
        }).then((product) => {
            if (product) {
                console.log(userId, productId, price)
                models.tawar.create({
                    userId: id,
                    productId: req.body.productId,
                    price: price,
                }).then((tawar) => {
                    models.notifProduct.create({productId, userId, tawar:price, status:false})
                    .then((notif) =>{
                        res.status(200).json({
                            message: "Success create tawar",
                            success: true,
                            data: tawar
                        })
                    }).catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: err.message,
                            success: false,
                        })
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
                    model: models.product,
                    as: "product",
                    include: [{
                        model: models.user,
                        as: "user",
                        attributes: { exclude: ["password"] }
                    }]
                }
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
    
    getTawarProduct:  (req, res) => {
        // const {productId} = req.params.id
        models.tawar.findOne({
            where: {
                productId: req.params.id
            },
            include: [
                {
                    model: models.product, as: "product",
                },
                { model: models.user, as: "user", attributes: { exclude: ["password"] } },
            ],
        }).then((result) => {
            res.status(200).json({
                message: "Success get tawar Product",
                success: true,
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Failed get tawar Product",
                success: false,
            })
        })
    },

    getTawarId: (req, res) => {
        const id = req.params.tawarId
        models.tawar.findAll({
            where: { id: id },
            include: [
                { model: models.product, as: "product" },
                { model: models.user, as: "user", attributes: { exclude: ["password"] } },
            ],  
        }).then((result) => {
            res.status(200).json({
                message: "Success get tawar Product",
                success: true,
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            })
        })
    },

    getTawarSeller: (req, res) => {
        console.log(req.user.id)
        models.tawar.findAll({
            include: [
                {
                    model: models.product, as: "product",
                    where: {
                        userId: req.user.id
                    }
                }
            ],  
        }).then((result) => {
            res.status(200).json({
                message: "Success get tawar Seller",
                success: true,
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            })
        })
    },

    getTawarBuyer: (req, res) => {
        models.tawar.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: models.product, as: "product"
                }
            ],  
        }).then((result) => {
            res.status(200).json({
                message: "Success get tawar Buyer",
                success: true,
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            })
        })
    },

    get: (req, res) => {

    },

    deleteTawar: (req, res) => {
        models.tawar.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((tawar) => {
                if (tawar) {

                    res.status(200).json({
                        message: "Success delete Tawar",
                        success: true,
                    })
                } else {
                    res.status(500).json({
                        message: "Tawar Gagal",
                        success: false,
                    });
                }
            }).catch((err) => {
                res.status(500).json({
                    message: "failed delete tawar",
                    success: false,
                })
            })
    }
}
