#!/bin/bash

echo "Downloading yt-dlp and ffmpeg..."

# Create bin directory
mkdir -p bin
cd bin

# Download yt-dlp
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o yt-dlp
chmod +x yt-dlp

# Download ffmpeg static binary
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz -o ffmpeg.tar.xz
tar -xf ffmpeg.tar.xz --strip-components=1
chmod +x ffmpeg

cd ..
echo "Tools downloaded to ./bin"