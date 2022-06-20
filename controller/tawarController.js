const models = require("../models");

module.exports = {
  createTawar: (req, res) => {
    let data = req.body;

    models.product.findOne({
      where: {
        id: data.product_id,
        publish: true,
        isSold: false,
      },
    }).then(() => {
        models.tawar.create({
            user_id: data.user_id,
            product_id: data.product_id,
            price: data.price,
        }). then((tawar) => {
            res.status(200).json({
                message: "Tawar Berhasil",
                success: true,
                data: tawar
            })
        })
    }).catch((err) => {
        res.status(400).json({
            message: err.message,
            success: false,
        });
    })
  },

  getTawar: (req, res) => {

    models.tawar.findAll({
    })
      .then((tawar) => {
        res.status(200).json({
          message: "Succes get Tawar",
          success: true,
          data: tawar,
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
