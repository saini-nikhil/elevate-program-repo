const express = require('express');
const multer = require('multer');
const {
    createEmp,
    getEmp,
    getEmpbyId,
    updateEmp,
    deleteEmp,
  } = require("../controllers/empcontroller");
const { authMiddleware } = require('../middlewares/authMiddleware');


const router = express.Router()

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})


const upload = multer({ storage });

router.post('/employee', authMiddleware, upload.single('profilePicture'), createEmp);
router.get('/employees', authMiddleware, getEmp);
router.get('/employee/:id', authMiddleware, getEmpbyId);
router.put('/employee/:id', authMiddleware, upload.single('profilePicture'), updateEmp);
router.delete('/employee/:id', authMiddleware, deleteEmp);



module.exports = router;