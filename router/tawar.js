const express = require("express")
const router = express.Router()
const tawar = require('../controller/tawarController')
const restrict = require('../middleware/restrict')

router.post("/tawar",restrict,  tawar.createTawar)
router.get("/tawar",restrict,  tawar.getTawar)
router.get("/tawar/product/:id", restrict, tawar.getTawarProduct)
router.get("/tawar/:tawarId", restrict, tawar.getTawarId)
router.get("/tawar/user/sell", restrict, tawar.getTawarSeller)
router.get("/tawar/user/buy", restrict, tawar.getTawarBuyer)

router.delete('/tawar/:id', restrict, tawar.deleteTawar)


module.exports = router
