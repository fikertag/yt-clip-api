#!/bin/bash

echo "Installing ffmpeg and yt-dlp..."

# Update and install ffmpeg
apt-get update && apt-get install -y ffmpeg

# Install pip if missing
apt-get install -y python3-pip

# Install yt-dlp using pip
pip3 install -U yt-dlp
