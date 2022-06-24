const models = require("../models");

module.exports = {
  updateProfile: (req, res) => {
    const id = req.user.id;
    const data = req.body;
    console.log(req.file);

    if (req.file) {
      data.image = req.file.filename;
    }
    models.user
      .update(data, { where: { id } })
      .then(() => {
        res
          .status(200)
          .json({ message: "Success update profile", success: true });
      })
      .catch((err) => {
        res
          .status(200)
          .json({ message: "Failed update profile", success: false });
      });
  },
  getProfile: (req, res) => {
    const id = req.session.userId;
    console.log(req.session)
    models.user
      .findOne({
        where: {
          id,
        },
        attributes: { exclude: ["password"] },
      })
      .then((user) => {
        res.status(200).json({
          message: "Get Profile Berhasil",
          success: true,
          data: user,
        });
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: "Get Profile Gagal",
          success: false,
        });
      });
  },
};
