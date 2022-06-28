const router = require("express").Router();
const users = require("../controller/userController");

const { upload } = require("../middleware/uploads");
const restrict = require('../middleware/restrict')

router
  .put("/users/profile", restrict, upload, users.updateProfile)
  .get("/users/profile", restrict, users.getProfile);

module.exports = router;
