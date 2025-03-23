const express = require("express")
const {getemp , createemp} = require("../controller/emp.controller")
const router = express.Router()

router.get("/getemp" ,getemp )
router.post("/createemp" ,createemp )


module.exports = router