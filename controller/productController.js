const {product, productImage} = require("../models")

module.exports = {
    getProduct: (req, res) => {
        product.findAll({})
        .then(products => {
            res.json({message: "Product Ditemukan", success: true, data: {products}})
        })
        .catch(err => {
            res.json({message: "Product Gagal Ditemukan", success: false, data: {}})
        })
    },
    getUserProduct: (req, res) => {
        product.findAll({where: {userId: req.session.userId}})
        .then(products => {
            res.json({message: "Product User Ditemukan", success: true, data: {products}})
        })
        .catch(err => {
            res.json({message: "Product User Gagal Ditemukan", success: false, data: {}})  
        })
    },
    postProduct: (req, res) => {
        const {name, category, price, description} = req.body
        const userId = req.session.userId
        const files = req.files
        console.log(userId, name, category, price, description)
        product.create({userId, name, category, price, description})
        .then((product) => {
            console.log(product)
            files.map(function(file){
                console.log(product.id, file.filename)
                productImage.create({productId: product.id, image: file.filename})
            })
            res.json({message: "Success tambah product", success: true, data: {product}})
        })
        .catch(err => {
            res.json({message: "Gagal tambah product", success: false, data: {}})
        })
    },
    putProduct: (req, res) => {
        const {name, category, price, description} = req.body
        const userId = req.session.userId
        const files = req.files
        console.log(userId, name, category, price, description)
        product.update({userId, name, category, price, description},
            {where: { id: req.params.id }})
        .then((product) => {
            console.log(product)
            productImage.destroy({where: {productId: req.params.id}})
            files.map(function(file){
                console.log(product.id, file.filename)
                productImage.create({productId: product.id, image: file.filename})
            })
            res.json({message: "Success update product", success: true, data: {product}})
        })
        .catch(err => {
            res.json({message: "Gagal update product", success: false, data: {}})
        })
    },
    getProductId: (req, res) => {
        product.findOne({where: {id: req.params.id}})
        .then(product => {
            if(product.length < 1) {
                error
            }
            productImage.findAll({where: {productId: +req.params.id}})
            .then(images => {
                res.json({message: "Product Id Ditemukan", success: true, data: {product, images}})
            })
            .catch(err => {
                res.json({message: "Image Product Gagal Ditemukan", success: false, data: {product, images: {}}})
            })
        })
        .catch(err => {
            res.json({message: "Product Id Gagal Ditemukan", success: false, data: {}})  
        })
    },
    deleteProduct: (req, res) => {
        product.destroy({where: {id: req.params.id}})
        .then((product) => {
            res.json({message: "Product Dihapus", success: true, data: {product}})
        })
        .catch(err => {
            res.json({message: "Product Gagal Dihapus", success: false, data: {}})  
        })
    }
}