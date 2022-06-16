const router = require("express").Router();
const users = require("../controller/userController");

const { upload } = require("../middlewares/uploads");

router
  .patch("/users/profile/:id", upload, users.updateProfile)
  .get("/users/list", users.getAllUser)
  .get("/users/profile/:id", users.getProfile);

module.exports = router;
