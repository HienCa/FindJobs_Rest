const messageController = require('../controllers/messageController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/:id', verifyToken, messageController.getAllMessage);
router.post('/', verifyToken, messageController.sendMessgae);


module.exports = router;