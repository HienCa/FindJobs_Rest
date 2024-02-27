const userController = require('../controllers/userController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/', verifyAdmin, userController.getAllUser);
router.get('/:id',verifyAndAuthorization, userController.getUser);

router.post('/', verifyAdmin, userController.createUser);
router.put('/:id', verifyAdmin, userController.updateUser);
router.delete('/:id', verifyAdmin, userController.deleteUser);


module.exports = router;