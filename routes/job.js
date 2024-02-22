const jobController = require('../controllers/jobControllers');
const { Router } = require('express')
const router = Router();
const { verifyAndAuthorization, verifyToken, verifyAdmin } = require('../middleware/verifyToken')

router.get('/',  jobController.getAllJob);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/:id', jobController.getJob);
router.get('/search/:key', jobController.searchJobs);


module.exports = router;