import { Request, Response } from 'express';
import { DownloadService } from '../services/download.service';
import { VideoService } from '../services/video.service';
import { Result } from '../../common/utils/response.utils';
import { HttpStatus } from '../../common/constants/http-status.constant';

export class VideoController {
  private downloadService: DownloadService;
  private videoService: VideoService;

  constructor(downloadService: DownloadService, videoService: VideoService) {
    this.downloadService = downloadService;
    this.videoService = videoService;
  }

  async getMetadata(req: Request, res: Response) {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    try {
      const { outputPath } = await this.downloadService.downloadVideo(videoUrl);

      return this.videoService.getMetadata(outputPath, res);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Download error:', error.message);
      } else {
        console.error('Unknown error occurred');
      }

      return new Result().error(
        res,
        HttpStatus.INTERNAL_ERROR,
        'Failed to get metadata of the video',
      );
    }
  }

  async getThumbnails(req: Request, res: Response) {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    try {
      const { outputPath, screenshotsPath, filename } =
        await this.downloadService.downloadVideo(videoUrl);

      return this.videoService.getThumbnails(outputPath, screenshotsPath, filename, res);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Get thumbnails error:', error.message);
      } else {
        console.error('Unknown error occurred');
      }

      return new Result().error(
        res,
        HttpStatus.INTERNAL_ERROR,
        'Failed to get thumbnails of the video',
      );
    }
  }
}
