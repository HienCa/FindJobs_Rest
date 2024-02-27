const chatController = require('../controllers/chatController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.post('/', verifyToken, chatController.accessChat);
router.get('/:id', verifyToken, chatController.getChats);
router.get('/:id', verifyToken, chatController.getChat);


module.exports = router;