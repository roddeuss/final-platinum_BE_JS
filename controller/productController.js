const {user, product} = require("../models")
const Sequelize = require("sequelize")

module.exports = {
    checkUser: (req, res, next) => {
        user.findOne({where: { id : req.user.id}})
        .then((users) => {
            if(users.name && users.city && users.address && users.image && users.number_mobile){
                next()
            } else {
                return res.json({message: "Isi biodata dulu", success: false, data: {}})
            }
        }).catch(err => {
            res.json({message: "Login Dulu", success: false, data: {}})
        })
    },
    checkProduct: (req, res, next) => {
        product.findAll({where: {userId: req.user.id} })
        .then(products => {
            if(products.length < 4){
                next()
            } else {
                res.json({message: "Productmu sudah lebih dari 4", success: false, data: {}})
            }
        })
        .catch(err =>{
            res.json({message: "Product user gagal ditemukan", success: false, data: {}})
        })
    },
    getProduct: (req, res) => {
        product.findAll({where: {isSold: false, publish: true}})
        .then(products => {
            if(products.length == 0){
                res.json({message: "Product Kosong", success: true, data: {products}})
            } else {
                res.json({message: "Product Ditemukan", success: true, data: {products}})
            }
        })
        .catch(err => {
            console.log(err)
            res.json({message: "Product Gagal Ditemukan", success: false, data: {}})
        })
    },
    getSearchProduct: (req, res) => {
        const name = req.query.search
        if(!name){
            return res.json({message: "Use /product?search=value", success: false, data: {}})
        }
        product.findAll({where: {
            name: {[Sequelize.Op.iLike]: `%${name}%`}
        }}).then(filtered => {
            res.json({message: `Product Search ${name} Ditemukan`, success: true, data: {filtered}})
        }).catch(err => {
            console.error(err)
            res.json({message: `Product Search ${name} gagal Ditemukan`, success: false, data: {}})
        })
    },
    getFilterCategory: (req, res) => {
        const category = req.query.cat
        if(!category){
            return res.json({message: "Use /product/filter?cat=value", success: false, data: {}})
        }
        product.findAll({where: {
            category: {[Sequelize.Op.iLike]: `%${category}%`}
        }}).then(filtered => {
            res.json({message: `Product Category ${category} Ditemukan`, success: true, data: {filtered}})
        }).catch(err => {
            console.error(err)
            res.json({message: `Product Category ${category} gagal Ditemukan`, success: false, data: {}})
        })
    },
    getUserProduct: (req, res) => {
        product.findAll({where: {userId: req.user.id}})
        .then(products => {
            res.json({message: "Product User Ditemukan", success: true, data: {products}})
        })
        .catch(err => {
            res.json({message: "Product User Gagal Ditemukan", success: false, data: {}})  
        })
    },
    postProduct: (req, res) => {
        const {name, category, price, description, publish} = req.body
        if(!req.user){
            return res.json({message: "Login Dulu", success: false, data: {}})
        }
        const userId = req.user.id
        const files = req.fileUploads
        console.log(req.files)
        console.log(userId, name, category, price, files, description)
        product.findAll({where : {userId : req.user.id, isSold: true}})
        .then((products) => {
            if(products.length < 4){
                product.create({userId, name, category, price, description, images: files, publish})
                .then((product) => {
                    console.log(product)
                    res.json({message: "Success tambah product", success: true, data: {product}})
                })
                .catch(err => {
                    console.log(err)
                    res.json({message: "Gagal tambah product", success: false, data: {}})
                })
            } else {
                res.json({message: "Productmu sudah maksimal", success: false, data: {}})
            }
        })
    },
    putProduct: (req, res) => {
        const {name, category, price, description} = req.body
        const userId = req.user.id
        const files = req.fileUploads
        console.log(userId, name, category, price, description)
        product.update({userId, name, category, price, description, images: files, publish: true},
            {where: { id: req.params.id }})
        .then((product) => {
            console.log(product)
            res.json({message: "Success update product", success: true, data: {product}})
        })
        .catch(err => {
            res.json({message: "Gagal update product", success: false, data: {}})
        })
    },
    getProductId: (req, res) => {
        product.findOne({where: {id: req.params.id}, include: [{
            model: user,
            as: "user",
            attributes: { exclude: ["password"] }
        }]})
        .then(product => {
            if(product.length < 1) {
                error
            }
            res.json({message: "Product Id Ditemukan", success: true, data: {product}})
        })
        .catch(err => {
            console.log(err)
            res.json({message: "Product Id Gagal Ditemukan", success: false, data: {}})  
        })
    },
    getProductSold: (req, res) => {
        product.findAll({where: {userId: req.user.id, isSold: true}})
        .then(productSold => {
            if(productSold.length < 1) {
                error
            }
            res.json({message: "Product Ditemukan", success: true, data: {productSold}})
        }).catch(err => {
            res.json({message: "Tidak ada product yang terjual", success: true, data: {}})
        })
    },
    publishProduct: (req, res) => {
        const productId = req.params.id;
        const userId = req.user.id
        product.findOne({where : {id: productId, userId}})
        .then(products => {
            console.log(products)
            product.update(
                {publish: true},
                {where : {id: products.id}}
            ).then(update => {
                res.json({message: `Product Berhasil Dipublish`, success: true, data: {update}})
            }).catch(err => {
                res.json({message: "Product Gagal Dirubah", success: false, data: {}})
            })
        }).catch(err => {
            res.json({message: "Product Tidak Dapat Dirubah", success: false, data: {}})
        })
    },
    keepProduct: (req, res) => {
        const productId = req.params.id;
        const userId = req.user.id
        product.findOne({where : {id: productId, userId}})
        .then(products => {
            console.log(products)
            product.update(
                {publish: false},
                {where : {id: products.id}}
            ).then(update => {
                res.json({message: `Product Berhasil Dikeep`, success: true, data: {update}})
            }).catch(err => {
                res.json({message: "Product Gagal Dirubah", success: false, data: {}})
            })
        }).catch(err => {
            res.json({message: "Product Tidak Dapat Dirubah", success: false, data: {}})
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