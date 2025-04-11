const express = require('express');
const multer = require('multer');
const {
    createEmp,
    getEmp,
    getEmpbyId,
    updateEmp,
    deleteEmp,
    getAllEmps,
    debugEmps
  } = require("../controllers/empcontroller");
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');


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

// Admin routes
router.post('/admin/employee', adminMiddleware, upload.single('profilePicture'), createEmp);
router.get('/admin/employees', adminMiddleware, getAllEmps);
router.get('/admin/employee/:id', adminMiddleware, getEmpbyId);
router.put('/admin/employee/:id', adminMiddleware, upload.single('profilePicture'), updateEmp);
router.delete('/admin/employee/:id', adminMiddleware, deleteEmp);

// Employee routes (accessible by both admins and employees)
router.get('/employees', authMiddleware, getEmp);
router.get('/employee/:id', authMiddleware, getEmpbyId);

// Debug route - make accessible without auth for testing
router.get('/debug/employees', debugEmps);
// Handle OPTIONS request for the debug endpoint
router.options('/debug/employees', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(204).send();
});

// Legacy routes for backward compatibility
router.post('/employee', authMiddleware, upload.single('profilePicture'), createEmp);
router.put('/employee/:id', authMiddleware, upload.single('profilePicture'), updateEmp);
router.delete('/employee/:id', authMiddleware, deleteEmp);

module.exports = router;