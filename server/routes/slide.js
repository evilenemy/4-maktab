const express = require("express");
const router = express.Router();
const { getAllSlides, getSlide } = require("../controllers/slideController");

// GET ALL
router.get("/", getAllSlides);

// GET
router.get("/:id", getSlide);

module.exports = router;
