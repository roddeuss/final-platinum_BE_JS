const router = require("express").Router();

const transaksi = require("../controller/transaksiController");

router.post("/transaksi", transaksi.createTransaksi)
    .get("/transaksi", transaksi.getTransaksi)

module.exports = router;