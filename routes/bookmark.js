const bookmarkController = require('../controllers/bookmarkControllers');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/',  bookmarkController.getAllBookmark);
router.post('/', bookmarkController.createBookmark);
router.put('/:id', bookmarkController.updateBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);
router.get('/:id', bookmarkController.getBookmark);
router.get('/search/:key', bookmarkController.searchBookmarks);


module.exports = router;