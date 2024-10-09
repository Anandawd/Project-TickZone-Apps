const express = require("express");
const router = express();
const {
  createCmsOrganizer,
  createCmsUser,
  getCmsAllUsers,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post(
  "/organizers",
  authenticateUser,
  authorizeRoles("owner"),
  createCmsOrganizer
);

router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCmsUser
);

router.get("/users", authenticateUser, authorizeRoles("owner"), getCmsAllUsers);

module.exports = router;
