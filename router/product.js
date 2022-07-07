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
        let fileName = `${file.fieldname}-${unique}.${ext}`;
        cb(null, fileName);

        if(!req.fileUploads){
            req.fileUploads = []
        }
        req.fileUploads.push(fileName);
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
router.get('/product?', product.getSearchProduct)
router.get('/product/filter?', product.getFilterCategory)
router.get('/product/user', restrict, product.getUserProduct)
router.get('/product/:id', product.getProductId)
router.get('/product/user/sold', product.getProductSold)
// router.get('/addProduct', function(req, res) {
//     res.render('views/uploadImage')
// })
router.post('/product', restrict, product.checkUser, uploadImage.array('image', 5), product.postProduct)
router.put('/product/:id', restrict, uploadImage.array('image', 5), product.putProduct)
router.post('/product/publish/:id', restrict, product.publishProduct)
router.delete('/product/:id', restrict, product.deleteProduct)

module.exports = router