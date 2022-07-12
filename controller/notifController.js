const {notifProduct, product} = require("../models")
const {Op} = require("sequelize")

module.exports = {
    getNotif: (req, res) => {
        notifProduct.findAll({include: [
            {
                model: product,
                as: "product",
                where: {userId: req.user.id},
            }
        ]}).then((notif) =>{
            res.json({message: "Get All notif", success: true, data: notif})
        }).catch((err) =>{
            res.json({message: "Cannot Get All notif", success: false, data: err.message})
        })
    }
}