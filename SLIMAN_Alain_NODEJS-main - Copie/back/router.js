import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import boosterRoutes from "./routes/boosterRoutes.js";
import verifyTokenMiddleware from './middlewares/verifyToken.js';

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/user', verifyTokenMiddleware, userRoutes);
router.use('/api', verifyTokenMiddleware, boosterRoutes);

export default router;
