const bookmarkController = require('../controllers/bookmarkController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/', verifyToken, bookmarkController.getAllBookmark);
router.post('/', verifyToken, bookmarkController.createBookmark);
router.put('/:id', verifyToken, bookmarkController.updateBookmark);
router.delete('/:id', verifyToken, bookmarkController.deleteBookmark);
router.get('/:id', verifyToken, bookmarkController.getBookmark);
router.get('/search/:key', verifyToken, bookmarkController.searchBookmarks);


module.exports = router;