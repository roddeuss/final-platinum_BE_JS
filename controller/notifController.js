const {notifProduct, product} = require("../models")
const {Op} = require("sequelize")

module.exports = {
    getNotif: (req, res) => {
        let listProduct = [];
        product.findAll({where: {userId: req.user.id}})
        .then(products => {
            products.forEach((pdc) =>{
                console.log(pdc.id)
                listProduct.push(pdc.id)
                console.log(listProduct)
            })
            notifProduct.findAll({
                where: {[Op.or]: [{productId: {[Op.in]: listProduct}}, {userId: req.user.id}] },
                include: [
                {
                    model: product,
                    as: "product",
                }
            ]}).then((notif) =>{
                res.json({message: "Get All notif", success: true, data: notif})
            }).catch((err) =>{
                res.json({message: "Cannot Get All notif", success: false, data: err.message})
            })
        })
        console.log(listProduct)
    },
    deleteNotif: (req, res) => {
        const {tawarId} = req.params
        notifProduct.destroy({where: {id: tawarId}})
        .then((notif) =>{
            res.json({message: "Success Delete notif", success: true, data: notif})
        }).catch((err) =>{
            res.json({message: "Cannot Delete notif", success: false, data: err.message})
        })
    }
}