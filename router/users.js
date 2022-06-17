const router = require("express").Router();
const users = require("../controller/userController");

const { upload } = require("../middleware/uploads");

router
  .put("/users/profile", upload, users.updateProfile)
  .get("/users/profile", users.getProfile);

module.exports = router;
