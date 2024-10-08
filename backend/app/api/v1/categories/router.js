const express = require("express");
const router = express();
const { index, find, create, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middleware/auth");

router.get(
  "/categories",
  authenticateUser,
  // authorizeRoles("organizer", "admin"),
  index
);

router.get("/categories/:id", authenticateUser, find);

router.put("/categories/:id", authenticateUser, update);

router.delete("/categories/:id", authenticateUser, destroy);

router.post("/categories", authenticateUser, create);

module.exports = router;
