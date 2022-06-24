const express = require("express")
const router = express.Router()
const tawar = require('../controller/tawarController')

router.post("/tawar",  tawar.createTawar)
router.get("/tawar",  tawar.getTawar)

module.exports = router