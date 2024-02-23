const authController = require('../controllers/authController');
const { Router } = require('express')
const router = Router();


router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);

module.exports = router;