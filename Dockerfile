# syntax=docker/dockerfile:1
ARG NODE_VERSION=18

#Build Stage - Using to generate the ts compiled files

FROM node:${NODE_VERSION}-alpine  as build

# Install python for node-grep required by @discord/opus
RUN apk add --no-cache python3 make g++

# Set the working directory so we can use relative paths
WORKDIR /usr/src/app


# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

ENV PYTHON=/usr/bin/python3
ENV npm_config_python=/usr/bin/python3

RUN npm run build:tsc

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev && npm install -g typescript

COPY --from=build /usr/src/app/dist ./dist

# create privleged user to allow us to write changes to the application during develompment
RUN adduser --disabled-password --shell /bin/sh -u 1001 app
USER app

COPY --chown=app:app . /app

# Expose the port that the application listens on.
EXPOSE 6000

# Use production node environment by default.
ENV NODE_ENV production

# Run the application.
CMD node dist/src/bot.js
