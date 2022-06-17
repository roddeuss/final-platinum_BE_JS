const tawar = require('../controller/tawarController')
const express = require('express')
const router = express.Router()

router.get('/tawars', tawar.getTawar)
router.get('/tawars/product',tawar.getTawarProduct)
router.get('/tawars/:id', tawar.getTawarId)

router.post('/tawars/', tawar.postTawar)
router.put('/tawars/:Id', tawar.putTawar)
router.delete('/tawars/:id', tawar.deleteTawar)

module.exports = router