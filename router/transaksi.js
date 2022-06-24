const router = require("express").Router();

const tawar = require('../controller/tawarController')
const restrict = require('../middleware/restrict')

router
    .post("/tawar", restrict, tawar.createTawar)
    .get('/tawar', restrict, tawar.getTawar)


module.exports = router