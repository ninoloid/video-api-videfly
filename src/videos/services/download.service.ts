import axios from 'axios';
import { createWriteStream } from 'fs';
import { join } from 'path';

export class DownloadService {
  async downloadVideo(
    url: string,
  ): Promise<{ outputPath: string; screenshotsPath: string; filename: string }> {
    try {
      const projectRoot = join(__dirname, '..', '..', '..');
      const filename = `video-${new Date().getTime()}`;
      const outputPath = join(projectRoot, 'public', 'videos', filename);
      const screenshotsPath = join(projectRoot, 'public', 'thumbnails');
      const writer = createWriteStream(outputPath);

      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve({ outputPath, screenshotsPath, filename }));
        writer.on('error', reject);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
