const router = require("express").Router();

const tawar = require("../controller/tawarController");

router.post("/tawar", tawar.createTawar)
router.get("/tawar", tawar.getTawar)

module.exports = router;