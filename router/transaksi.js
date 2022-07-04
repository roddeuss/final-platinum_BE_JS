const router = require("express").Router();

const transaksi = require("../controller/transaksiController");
const restrict = require('../middleware/restrict')

router.post("/transaksi", restrict, transaksi.createTransaksi)
    .get("/transaksi", restrict, transaksi.getTransaksi)
    .get("/transaksi/:id", restrict, transaksi.getDetailTransaksi)


module.exports = router