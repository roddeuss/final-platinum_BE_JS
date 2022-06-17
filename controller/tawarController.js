const {tawar, product, transaksi } = require("../models")

module.exports = {
    getTawar: (req, res) => {
        tawar.findAll({})
        .then(tawars => {
            res.json({message: "Tawar Ditemukan", success: true, data: {tawars}})
        })
        .catch(err => {
            res.json({message:  "Tawar Tidak Ditemukan", success: false, data:{}})
        })
    },
    getTawarProduct: (req, res) =>{
        tawar.findAll({where: {product_id: req.session.product_id}})
        .then(tawars => {
            res.json({message: "Tawar Product Ditemukan", success: true, data:{tawars}})
        })
        .catch(err => {
            res.json({message: "Tawar Produckt Gagal Ditemukan", success: true, data: {}})
        })
    },
    postTawar: (req, res) =>{
        const {product_id, price, status} = req.body
        console.log(product_id, price, status)
        tawar.create({product_id, price, status})
        .then((tawar) => {
            console.log(tawar)
            res.json({message: "Success Tawar Product", success: true, data:{tawars}})
        })
        .catch(err => {
            res.json({message: "Gagal Tawar Product", success: false, data:{}})
        })
    },
    putTawar: (req, res) => {
        const {product_id, price, status} = req.body
        console.log(product_id, price, status)
        tawar.update({product_id, price, status}, 
            {where: { id: req.params.id}})
            .then((tawar) => {
                console.log(tawar)
                res.json({message: "Success Update Tawar", success:true, data: {tawar}})
            })
            .catch( err => {
                res.json({message: "Gagal Update Tawar", success: false, data: {}})
            })
    },

    getTawarId: (req, res) => {
        tawar.findOne({where: {id: req.params.id}})
        .then(tawar => {
            res.json({message: "Tawar Id  Ditemukan", success:true, data:{tawar}})
        })
        .catch(err => {
            res.json({message: "Tawar Id Tidak Ditemukan", success:false,data:{}})
        })
    },

    deleteTawar: (req, res) => {
        tawar.destroy({where: {id: req.params.id}})
        .then((tawar) => {
            res.json({message: "Tawar Product Dihapus", success: true, data: {tawar}})
        })
        .catch(err => {
            res.json({message: "Tawar Product Gagal Dihapus", success: false, data: {}})  
        })
    }
}