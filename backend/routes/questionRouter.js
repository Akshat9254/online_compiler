const express = require("express");
const router = express.Router();

const { questionController } = require("../controller");

router.post("/submit", questionController.submit);
router.get("/status/:id", questionController.status);

module.exports = router;
