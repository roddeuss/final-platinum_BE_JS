const product = require('../controller/productController')
const express = require('express')
const router = express.Router()
const multer = require("multer");
const restrict = require('../middleware/restrict')

const uploadImage = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        const unique = Date.now();
        let ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        cb(null, `${file.fieldname}-${unique}.${ext}`);
    }
}), fileFilter: (req, file, cb) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("Error, only accepted .png .jpg. jpeg"))
    }
}})

router.get('/products', product.getProduct)
router.get('/product/user', restrict, product.getUserProduct)
router.get('/product/:id', product.getProductId)
// router.get('/addProduct', function(req, res) {
//     res.render('views/uploadImage')
// })
router.post('/product', restrict, uploadImage.array('images-product', 5), product.postProduct)
router.put('/product/:id', restrict, uploadImage.array('images-product', 5), product.putProduct)
router.post('/product/publish/:id', restrict, product.publishProduct)
router.post('/product/keep/:id', restrict, product.keepProduct)
router.delete('/product/:id', restrict, product.deleteProduct)

module.exports = router