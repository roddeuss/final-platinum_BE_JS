const models = require("../models");
module.exports = {
  createTransaksi: (req, res) => {
    let data = req.body;

    models.tawar.findAll({
      where: {
        userId: data.userId,
        productId: data.productId
      }
    }).then(result => {
      if (result.length > 0) {
        models.transaksi.create(data).then(result => {
          res.status(200).json({
            message: "Success create transaksi",
            success: true,
            data: result
          });
        }
        ).catch(err => {
          res.status(500).json({
            message: err.message,
            success: false,
          });
        })
      } else {
        res.status(500).json({
          message: "Product not found in tawar",
          success: false,
        });
      }
    }).catch(err => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    })

  },

  updateTransaksi: (req, res) => {
    let data = req.body;
    models.transaksi.findOne({
      where: {
        id: data.transaksiId
      }
    }).then(result => {
      if (result != null) {
        console.log(data);
        if (data.status === "accepted") {
          models.transaksi.update({
            status: data.status
          }, {
            where: {
              id: data.transaksiId
            }
          })
          models.product.update({
            isSold: true
          }, {
            where: {
              id: result.productId
            }
          })
          models.tawar.destroy({
            where: {
              productId: result.productId
            }
          })

          res.status(200).json({
            message: "Transaksi accepted",
            success: true,
          });
        }

        if (data.status === "rejected") {
          models.transaksi.update({
            status: data.status
          }, {
            where: {
              id: data.transaksiId
            }
          })
          models.tawar.destroy({
            where: {
              id: req.params.id
            }
          })

          res.status(200).json({
            message: "Transaksi rejected",
            success: true,
          });

        }

      } else {
        res.status(500).json({
          message: "Transaksi not found",
          success: false,
        });
      }

    }
    ).catch(() => {
      res.status(500).json({
        message: "Transaksi not found",
        success: false,
      });
    })
  },

};
