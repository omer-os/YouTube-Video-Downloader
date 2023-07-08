import ytdl from "ytdl-core";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const URL = req.query.URL as string;

    if (!URL) {
      res.status(400).json({ error: "URL parameter is required" });
      return;
    }

    const videoMetaData = await ytdl.getBasicInfo(URL);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${videoMetaData.videoDetails.title}.mp3"`
    );
    res.setHeader(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );

    ytdl(URL, {
      format: "mp3",
    }).pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
