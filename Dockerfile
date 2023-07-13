FROM python:3.11.4-bookworm

# Install libraries, Node.js, npm, YOLO
RUN apt-get update \
    && apt-get install --no-install-recommends -y  \
        libgl1-mesa-glx \
        libglib2.0-0 \
        nodejs \
        npm \
    && pip3 install ultralytics \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy file with npm dependencies and install them
COPY package*.json ./
RUN npm install

# Copy the app code
COPY . ./

# Build and start the app
RUN npm run build
CMD ["npm", "run", "start:prod"]
