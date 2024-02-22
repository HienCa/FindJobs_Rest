const userController = require('../controllers/userControllers');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

// router.get('/', verifyAdmin, userController.getAllUser);
// router.get('/:id', verifyAndAuthorization, userController.getUser);

// router.post('/', verifyAdmin, userController.createUser);
// router.put('/:id', verifyAndAuthorization, userController.updateUser);
// router.delete('/:id', verifyAndAuthorization, userController.deleteUser);

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUser);

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;