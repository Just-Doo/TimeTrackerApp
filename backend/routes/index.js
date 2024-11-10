import express from 'express';
import ctrl from './index.ctrl.js';
const router = express.Router();

router.get('/', ctrl.get);
router.post('/', ctrl.post);  // Add this line for handling POST requests

export default router;  