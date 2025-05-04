import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Helper function with better error handling
function runCommand(cmd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`Command failed: ${cmd}`);
        console.error(`Stderr: ${stderr}`);
        return reject(new Error(stderr || "Command failed"));
      }
      resolve();
    });
  });
}

app.post("/api/clip", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const { url, start, end } = req.body;

      // Input validation
      if (!url || !start || !end) {
        return res.status(400).json({ error: "Missing url, start, or end" });
      }

      const id = uuidv4();
      const outputDir = "/tmp/clips";
      const BIN_DIR = path.join(__dirname, "../bin");
      const fullVideoPath = path.join(outputDir, `${id}_full.mp4`);
      const clipPath = path.join(outputDir, `${id}_clip.mp4`);

      fs.mkdirSync(outputDir, { recursive: true });

      await runCommand(
        `${path.join(
          BIN_DIR,
          "yt-dlp"
        )} -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${fullVideoPath}" "${url}"`
      );

      await runCommand(
        `${path.join(
          BIN_DIR,
          "ffmpeg"
        )} -ss ${start} -to ${end} -i "${fullVideoPath}" -c copy "${clipPath}"`
      );

      // Send file and clean up
      return res.download(clipPath, (err) => {
        if (err) console.error("Download failed:", err);
      });
    } catch (err: any) {
      console.error("Processing error:", err);
      // [fullVideoPath, clipPath].forEach(file => {
      //   if (fs.existsSync(file)) fs.unlinkSync(file);
      // });
      return res.status(500).json({ error: "Failed to process clip" });
    }
  })();
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
