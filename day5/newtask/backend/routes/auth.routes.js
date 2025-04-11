const express = require("express")
const {signup, login, getProfile, debug} = require("../controllers/authController")
const {authMiddleware} = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.get("/profile", authMiddleware, getProfile)

// Debug route - comment out or restrict in production
router.get("/debug", debug)

module.exports = router;