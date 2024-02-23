const chatController = require('../controllers/chatController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.post('/',  chatController.accessChat);
router.get('/', chatController.getChat);


module.exports = router;