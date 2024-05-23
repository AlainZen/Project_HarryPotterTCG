import express from 'express';
import { openBooster } from '../controllers/BoosterController.js';
import verifyTokenMiddleware from '../middlewares/verifyToken.js'; // Using the default export

const router = express.Router();

router.post('/open-booster', verifyTokenMiddleware, openBooster);

export default router;
/*import express from 'express';
import { openBooster } from '../controllers/BoosterController.js';

const router = express.Router();

router.post('/open-booster', openBooster);

export default router;*/