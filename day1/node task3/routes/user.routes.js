const {signup , login} = require("../controller/user.controller")
const exprees = require("express")
const router = exprees.Router()


router.post("/signup" , signup)
router.post("/login" , login)


module.exports = router