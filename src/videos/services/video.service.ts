import ffmpeg from 'fluent-ffmpeg';
import { unlinkSync } from 'fs';
import { Result } from '../../common/utils/response.utils';
import { Response } from 'express';
import { HttpStatus } from '../../common/constants/http-status.constant';
import { convertBitToKiloBit, getEnv } from '../../common/utils/helpers.utils';

export class VideoService {
  async getMetadata(outputPath: string, res: Response): Promise<void> {
    ffmpeg.ffprobe(outputPath, function (err, metadata) {
      if (err) {
        unlinkSync(outputPath);
        return new Result().error(res, HttpStatus.INTERNAL_ERROR, 'Failed to get metadata');
      }

      const streams = metadata.streams?.filter((item) => item.codec_type === 'video');
      if (!Array.isArray(streams) || streams.length === 0) {
        unlinkSync(outputPath);
        return new Result().error(res, HttpStatus.BAD_REQUEST, 'No video track found');
      }

      const videos = streams[0];
      const { codec_name, width, height, bit_rate, avg_frame_rate } = videos;

      unlinkSync(outputPath);
      return new Result().success(res, HttpStatus.OK, 'Success', {
        bitRate: convertBitToKiloBit(bit_rate),
        frameRate: avg_frame_rate,
        resolution: `${width}x${height}`,
        codec: codec_name,
      });
    });
  }

  async getThumbnails(
    outputPath: string,
    screenshotsPath: string,
    filename: string,
    res: Response,
  ): Promise<void> {
    ffmpeg(outputPath)
      .screenshots({
        count: 10,
        folder: screenshotsPath,
        size: '320x240',
        filename: filename,
      })
      .on('end', () => {
        const serverPort = getEnv('PORT');
        const serverUrl = getEnv('BASE_URL');
        const baseUrl =
          serverPort == '443' || serverPort == '80' ? serverUrl : `${serverUrl}:${serverPort}`;

        const paths = Array.from(
          { length: 10 },
          (_, index) => `${baseUrl}/thumbnails/${filename}_${index + 1}.png`,
        );
        unlinkSync(outputPath);
        return new Result().success(res, HttpStatus.OK, 'Success', {
          thumbnails: paths,
        });
      })
      .on('error', (err: any) => {
        console.error('Error generating thumbnails:', err);
        unlinkSync(outputPath);
        return new Result().error(res, HttpStatus.INTERNAL_ERROR, 'Error generating thumbnails');
      });
  }
}
