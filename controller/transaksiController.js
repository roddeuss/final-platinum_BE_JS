const models = require("../models");
module.exports = {
  createTransaksi: (req, res) => {
    let data = req.body;

    models.product.findOne({
      where: {
        id: data.product_id,
        publish: true,
        isSold: false,
      },
    }).then((product) => {
      if (product) {
        models.product.update(
          { isSold: true },
          { where: { id: data.product_id } }
        ).then(() => {
          models.transaksi.create({
            buyer_id: data.buyer_id,
            seller_id: data.seller_id, // || req.user.id
            productId: data.product_id,
            price: data.price,
          })
            .then((transaksi) => {
              res.status(200).json({
                message: "Transaksi Berhasil",
                success: true,
                data: transaksi,
              })
            })
        });
      } else {
        res.status(400).json({
          message: "Transaksi Gagal",
          success: false,
        });
      }
    })
  },

  getTransaksi: (req, res) => {

    models.transaksi.findAll({
      include: [
        {
          model: models.product, as: "product",
        },
      ],
      where: {
        seller_id: req.user.id
      }
    })
      .then((transaksi) => {
        res.status(200).json({
          message: "Succes get transaksi",
          success: true,
          data: transaksi,
        });
      }
      ).catch((err) => {
        res.status(400).json({
          message: err.message,
          success: false,
        });
      })
  },

  getDetailTransaksi: (req, res) => {
    models.transaksi.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        res.status(200).json({
          message: "Succes get transaksi",
          success: true,
          data: result,
        })
      }).catch((err) => {
        res.status(400).json({
          message: err.message,
          success: false
        })
      })
  }

};
