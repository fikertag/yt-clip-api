# Base image with Node.js and Python (needed for yt-dlp)
FROM node:18-bookworm-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip3 install --no-cache-dir yt-dlp

# Create app directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# Create clips directory
RUN mkdir -p clips

# Runtime command
CMD ["node", "dist/index.js"]