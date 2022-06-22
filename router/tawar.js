const router = require("express").Router();

<<<<<<< HEAD
router.get('/tawars', tawar.getTawar)
router.get('/tawars/product/:productId',tawar.getTawarProduct)
router.get('/tawars/:id', tawar.getTawarId)

router.post('/tawars/', tawar.postTawar)
router.put('/tawars/:id', tawar.putTawar)
router.delete('/tawars/:id', tawar.deleteTawar)
=======
const tawar = require("../controller/tawarController");

router.post("/tawar", tawar.createTawar)
router.get("/tawar", tawar.getTawar)
>>>>>>> e2c92cfa21184716cccd859f9da15ea321b14a68

module.exports = router;