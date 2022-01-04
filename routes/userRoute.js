const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updatePassword,
  updateUser,
} = require("../controller/userController");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");

router.route("/").get(authenticateUser, authorizeRoles("admin"), getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updatePassword").patch(authenticateUser, updatePassword);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/:id").get(getSingleUser);

module.exports = router;
