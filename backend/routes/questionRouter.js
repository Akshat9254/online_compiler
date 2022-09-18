const express = require("express");
const router = express.Router();

const { questionController } = require("../controller");

router.post("/submit", questionController.submit);

module.exports = router;
