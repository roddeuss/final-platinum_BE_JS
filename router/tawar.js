const express = require("express")
const router = express.Router()
const tawar =  require("../controller/tawarController")
const restrict = require('../middleware/restrict')

router.post("/tawars", restrict, tawar.createTawar)
router.get("/tawars", restrict, tawar.getTawar)

module.exports = router