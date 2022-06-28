const express = require("express")
const router = express.Router()
const tawar = require('../controller/tawarController')
const restrict = require('../middleware/restrict')

router.post("/tawar",restrict,  tawar.createTawar)
router.get("/tawar",restrict,  tawar.getTawar)
router.delete('/tawar/:id', restrict, tawar.deleteTawar)

module.exports = router
