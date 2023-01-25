const express = require("express");
const {
  loginUser,
  getUsers,
  getUser,
} = require("../controllers/userController");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

// middleware
router.use(adminAuth);

// GET ALL
router.get("/", getUsers);

// GET SINGLE
router.get("/:id", getUser);

module.exports = router;
