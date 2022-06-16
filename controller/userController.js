const models = require('../models');

module.exports = {
  updateProfile: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(req.file);
    models.user
      .findOne({
        where: {
          id,
        },
      })
      .then((user) => {
        if (user) {
          if (req.file) {
            data.image = req.file.filename;
          }
          user
            .update(data)
            .then((user) => {
              res.status(200).json({
                message: 'Profile updated successfully',
                success: true,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: 'Error updating profile',
                success: false,
              });
            });
        } else {
          res.status(404).json({
            message: 'User not found',
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error',
          success: false,
          data: err,
        });
      });
  },
  getAllUser: (req, res) => {
    const user = models.user
      .findAll({
        attributes: { exclude: ['password'] },
      })
      .then((user) => {
        res.status(200).json({
          message: 'Get All User Berhasil',
          success: true,
          data: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Get All User Gagal',
          success: false,
        });
      });
  },
  getProfile: (req, res) => {
    const { id } = req.params;
    const user = models.user
      .findOne({
        where: {
          id,
        },
        attributes: { exclude: ['password'] },
      })
      .then((user) => {
        res.status(200).json({
          message: 'Get Profile Berhasil',
          success: true,
          data: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Get Profile Gagal',
          success: false,
        });
      });
  },
};
