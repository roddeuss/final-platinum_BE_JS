const router = require("express").Router();
const tawar = require("../controller/tawarController")

router.get('/tawars', tawar.getTawar)
router.get('/tawars/product/:productId',tawar.getTawarProduct)
router.get('/tawars/:id', tawar.getTawarId)

router.post('/tawars/', tawar.postTawar)
router.put('/tawars/:id', tawar.putTawar)
router.delete('/tawars/:id', tawar.deleteTawar)

module.exports = router;