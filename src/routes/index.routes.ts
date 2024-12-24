import express from 'express';
import videoRoutes from '../videos/routes/video.routes';

const router = express.Router();

router.use('/videos', videoRoutes);

export default router;
