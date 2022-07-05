const router = require("express").Router();

const transaksi = require("../controller/transaksiController");
const restrict = require('../middleware/restrict')

router.post("/transaksi", restrict, transaksi.createTransaksi)
    .put("/transaksi/:id", restrict, transaksi.updateTransaksi)


module.exports = router