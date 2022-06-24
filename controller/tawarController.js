const {tawar} = require("../models");

module.exports = {
    getTawar: (req, res) => {
        tawar.findAll({include: "product"})
        .then(tawars => {
            console.log(tawars)
            res.json({message: "Tawar Ditemukan", success: true, data: {tawars}})
        })
        .catch(err => {
            console.log(err)
            res.json({message:  "Tawar Tidak Ditemukan", success: false, data:{}})
        })
    },
    getTawarProduct: (req, res) =>{
        const {productId} = req.params
        tawar.findAll({where: {product_id: productId}})
        .then(tawars => {
            if(tawars.length == 0){
                res.json({message: "Tawaran Product Kosong", success: true, data:{tawars}})
            } else {
                res.json({message: "Tawaran Product Ditemukan", success: true, data:{tawars}})
            }
        })
        .catch(err => {
            console.error(err)
            res.json({message: "Tawaran Product Gagal Ditemukan", success: true, data: {}})
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
    deleteTawar: (req, res) => {
        const {id} = req.params
        tawar.delete({where: {id}})
        .then((success) => {
            res.json({message: "Success Delete Tawar", success: true, data: {success}})
        })
        .catch( err => {
            res.json({message: "Gagal Delete Tawar", success: false, data: {}})
        })
    },
    getTawarId: (req, res) => {
        models.product.findOne({
            where: {
                id: data.product_id,
                publish: true,
                isSold: false,
        },
        }).then(() => {
            models.tawar.create({
                user_id: data.user_id,
                product_id: data.product_id,
                price: data.price,
        }). then((tawar) => {
            res.status(200).json({
                message: "Tawar Berhasil",
                success: true,
                data: tawar
            })
        })
        }).catch((err) => {
            res.status(400).json({
                message: err.message,
                success: false,
        });
    })
  }
};
