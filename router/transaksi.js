const router = require("express").Router();

const transaksi = require("../controller/transaksiController");
const restrict = require('../middleware/restrict')

router.post("/transaksi", restrict, transaksi.createTransaksi)
    .put("/transaksi/:id", restrict, transaksi.updateTransaksi)
    .get("/transaksi/buyer", restrict, transaksi.getTransaksiBuyer)
    .get("/transaksi/seller", restrict, transaksi.getTransaksiSeller)
    .get("/transaksi", restrict, transaksi.getTransaksi);


module.exports = router