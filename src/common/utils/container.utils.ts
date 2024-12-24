import { FfmpegCommand } from 'fluent-ffmpeg';
import { VideoController } from '../../videos/controllers/video.controller';
import { DownloadService } from '../../videos/services/download.service';
import { VideoService } from '../../videos/services/video.service';

// SERVICES
const videoService = new VideoService();
const downloadService = new DownloadService();

// CONTROLLERS
const videoController = new VideoController(downloadService, videoService);

const container = {
  services: {
    downloadService,
    videoService,
  },
  controllers: {
    videoController,
  },
};

export default container;
