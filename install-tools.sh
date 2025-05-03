#!/bin/bash

set -e # Exit on error

echo "Installing dependencies..."
mkdir -p bin
cd bin

# Install yt-dlp
echo "Downloading yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o yt-dlp
chmod +x yt-dlp

# Install FFmpeg (static build)
echo "Downloading FFmpeg..."
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
tar -xf ffmpeg-release-amd64-static.tar.xz --strip-components=1
chmod +x ffmpeg

# Verify installations
echo "Verifying installations..."
./yt-dlp --version
./ffmpeg -version

cd ..
echo "Tools installed in $PWD/bin"