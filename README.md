# Video API

This project provides an API endpoint related to video.

## How to Run Locally

To run this service on your local machine, you need to have FFmpeg and FFprobe installed. Since ffprobe is usually bundled with ffmpeg, you only need to install FFmpeg. Then run this command

```bash
npm install
npm run dev
```

Alternatively, if you prefer not to install FFmpeg and FFprobe locally, you can use Docker to run the service by executing the following command:

```bash
docker compose up
```

This will set up the environment with FFmpeg and FFprobe without requiring you to install them on your local machine.

## Endpoint

### `POST /api/videos/get-metadata`

This endpoint accepts a video URL and returns metadata information related to the video.

#### Request Body

The body of the request must include the `videoUrl` field with the URL of the video for which you want to retrieve the metadata.

##### Request Format:

```json
{
  "videoUrl": "string"
}
```

##### Example Request:

```json
{
  "videoUrl": "https://videocdn.cdnpk.net/joy/content/video/free/2012-07/large_preview/hd0987.mp4"
}
```

##### Example Request using curl:

You can use the following curl command to send a request to the endpoint:

```bash
curl --location 'http://localhost:3000/api/videos/get-metadata' \
--header 'Content-Type: application/json' \
--data '{
    "videoUrl": "https://videocdn.cdnpk.net/joy/content/video/free/2012-07/large_preview/hd0987.mp4"
}'
```

#### Response

The response is a JSON object with the following fields:

- code (number): The HTTP status code.
- message (string): A message describing the status.
- data (object): Contains the metadata of the video. It includes bitRate, frameRate, resolution, and codec.

##### Example Response:

```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "bitRate": 2919.5029296875,
    "frameRate": "30/1",
    "resolution": "1280x720",
    "codec": "h264"
  }
}
```

---

### `POST /api/videos/get-thumbnails`

This endpoint accepts a video URL and returns metadata information related to the video.

#### Request Body

The body of the request must include the `videoUrl` field with the URL of the video for which you want to get the thumbnails.

##### Request Format:

```json
{
  "videoUrl": "string"
}
```

##### Example Request:

```json
{
  "videoUrl": "https://videocdn.cdnpk.net/joy/content/video/free/2012-07/large_preview/hd0987.mp4"
}
```

##### Example Request using curl:

You can use the following curl command to send a request to the endpoint:

```bash
curl --location 'http://localhost:3000/api/videos/get-thumbnails' \
--header 'Content-Type: application/json' \
--data '{
    "videoUrl": "https://videocdn.cdnpk.net/joy/content/video/free/2012-07/large_preview/hd0987.mp4"
}'
```

#### Response

The response is a JSON object with the following fields:

- code (number): The HTTP status code.
- message (string): A message describing the status.
- data (object): Contains link to the thumbnails.

##### Example Response:

```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "thumbnails": [
      "http://localhost:3000/thumbnails/video-1735046002461_1.png",
      "http://localhost:3000/thumbnails/video-1735046002461_2.png",
      "http://localhost:3000/thumbnails/video-1735046002461_3.png",
      "http://localhost:3000/thumbnails/video-1735046002461_4.png",
      "http://localhost:3000/thumbnails/video-1735046002461_5.png",
      "http://localhost:3000/thumbnails/video-1735046002461_6.png",
      "http://localhost:3000/thumbnails/video-1735046002461_7.png",
      "http://localhost:3000/thumbnails/video-1735046002461_8.png",
      "http://localhost:3000/thumbnails/video-1735046002461_9.png",
      "http://localhost:3000/thumbnails/video-1735046002461_10.png"
    ]
  }
}
```
