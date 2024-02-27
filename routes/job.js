const jobController = require('../controllers/jobController');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/', jobController.getAllJob);
router.post('/', verifyToken, jobController.createJob);
router.put('/:id', verifyToken, jobController.updateJob);
router.delete('/:id', verifyToken, jobController.deleteJob);
router.get('/:id', jobController.getJob);
router.get('/search/:key', jobController.searchJobs);


module.exports = router;