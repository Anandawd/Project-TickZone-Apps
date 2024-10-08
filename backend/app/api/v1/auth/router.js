const express = require("express");
const router = express();
const { loginCms } = require("./controller");

router.post("/auth/login", loginCms);

module.exports = router;
