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
            user_id: data.user_id,
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
          where: {
            userId: req.session.userId,
          }
        },
      ],
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
  }

};
