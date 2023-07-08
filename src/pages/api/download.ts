// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

type Filter =
  | "audioandvideo"
  | "videoandaudio"
  | "video"
  | "videoonly"
  | "audio"
  | "audioonly";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoURL, format } = req.query;

  var selectedFormat: Filter = "audio";

  if (format === "mp4") {
    selectedFormat = "video";
  } else {
    selectedFormat = "audio";
  }

  // Validate input
  if (!videoURL || typeof videoURL !== "string") {
    res.status(400).send("Invalid or missing videoURL parameter");
    return;
  }

  if (
    !format ||
    typeof format !== "string" ||
    !["mp3", "mp4"].includes(format)
  ) {
    res.status(400).send("Invalid or missing format parameter");
    return;
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const videoFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
      filter: selectedFormat,
    });

    if (!videoFormat) {
      res.status(400).send("Could not find desired format in video formats");
      return;
    }

    let sanitizedTitle = info.videoDetails.title.replace(/[^\w\s_-]/g, "");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.${format}"`
    );

    res.setHeader("Content-Type", `audio/${format === "mp3" ? "mpeg" : "mp4"}`);

    const videoReadableStream = ytdl.downloadFromInfo(info, {
      format: videoFormat,
    });

    videoReadableStream.pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).end("Error downloading video");
  }
}
