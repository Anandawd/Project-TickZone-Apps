const express = require("express");
const router = express();
const { createCmsOrganizer, createCmsUser } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");

router.post("/organizers", createCmsOrganizer);
router.post("/users", authenticateUser, createCmsUser);

module.exports = router;
