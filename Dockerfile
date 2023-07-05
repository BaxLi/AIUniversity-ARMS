FROM python:3.11.4-bookworm

RUN apt-get update \
    && apt-get install --no-install-recommends -y  \
        libgl1-mesa-glx \
        libglib2.0-0 \
        nodejs \
        npm \
    && pip3 install ultralytics \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "start:prod"]
