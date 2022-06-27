<<<<<<< HEAD
const router = require("express").Router();
const tawar = require("../controller/tawarController")

router.get('/tawars', tawar.getTawar)
router.get('/tawars/product/:productId',tawar.getTawarProduct)
router.get('/tawars/:id', tawar.getTawarId)

router.post('/tawars/', tawar.postTawar)
router.put('/tawars/:id', tawar.putTawar)
router.delete('/tawars/:id', tawar.deleteTawar)

module.exports = router;
=======
const express = require("express")
const router = express.Router()
const tawar = require('../controller/tawarController')
const restrict = require('../middleware/restrict')

router.post("/tawar",restrict,  tawar.createTawar)
router.get("/tawar",restrict,  tawar.getTawar)
router.delete('/tawar/:id', restrict, tawar.deleteTawar)

module.exports = router
>>>>>>> 812c24172bb1a9d6e05103d2163be737c242fcec
