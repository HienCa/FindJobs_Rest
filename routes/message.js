const messageController = require('../controllers/messageController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/:id',  messageController.getAllMessgae);
router.post('/', messageController.sendMessgae);


module.exports = router;