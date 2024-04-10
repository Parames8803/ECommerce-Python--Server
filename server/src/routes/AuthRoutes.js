const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/auth", AuthController);

module.exports = router;
