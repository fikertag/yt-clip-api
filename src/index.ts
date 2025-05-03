import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("YouTube clip API is running.");
});

// TODO: Add your /api/clip route with yt-dlp + ffmpeg

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
