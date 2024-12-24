import express from 'express';
import container from '../../common/utils/container.utils';

const videoRoutes = express.Router();

videoRoutes.post('/get-metadata', async (req, res) => {
  await container.controllers.videoController.getMetadata(req, res);
});

videoRoutes.post('/get-thumbnails', async (req, res) => {
  await container.controllers.videoController.getThumbnails(req, res);
});

export default videoRoutes;
