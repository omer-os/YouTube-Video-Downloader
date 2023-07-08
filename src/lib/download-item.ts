import ytdl from "ytdl-core";
import fs from "fs";

const isValidYouTubeURL = (url: string): boolean => {
  const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url);
};

const normalizeYouTubeURL = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    throw new Error("Invalid YouTube URL");
  } catch (error) {
    throw new Error("Failed to normalize URL");
  }
};

export const downloadYouTubeVideo = (
  videoUrl: string,
  outputFilePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidYouTubeURL(videoUrl)) {
        videoUrl = normalizeYouTubeURL(videoUrl);
      }

      const videoStream = ytdl(videoUrl, {
        quality: "highest",
      });

      const fileStream = fs.createWriteStream(outputFilePath);

      videoStream.on("error", (error) => {
        console.error("Error in video stream", error);
        reject(error);
      });

      fileStream.on("finish", () => {
        console.log("Download completed");
        resolve();
      });

      fileStream.on("error", (error) => {
        console.error("Error writing to file", error);
        reject(error);
      });

      videoStream.pipe(fileStream);
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error);
    }
  });
};

export const downloadYouTubeAudio = (
  videoUrl: string,
  outputFilePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidYouTubeURL(videoUrl)) {
        videoUrl = normalizeYouTubeURL(videoUrl);
      }

      const videoStream = ytdl(videoUrl, {
        filter: "audioonly",
        quality: "highestaudio",
        format: "mp3",
      });

      const fileStream = fs.createWriteStream(outputFilePath);

      videoStream.on("error", (error) => {
        console.error("Error in video stream", error);
        reject(error);
      });

      fileStream.on("finish", () => {
        console.log("Download completed");
        resolve();
      });

      fileStream.on("error", (error) => {
        console.error("Error writing to file", error);
        reject(error);
      });

      videoStream.pipe(fileStream);
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error);
    }
  });
};

// Usage example:
// downloadYouTubeVideo('https://youtu.be/VIDEO_ID', 'path/to/output/video.mp4')
//   .then(() => console.log('Successfully downloaded video'))
//   .catch(error => console.error('Failed
