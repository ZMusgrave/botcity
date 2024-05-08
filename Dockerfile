# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a privleged user so we can write to files in the container during development.
RUN adduser --disabled-password --shell /bin/sh -u 1001 app
USER app

ARG TOKEN
ARG PREFIX

# Copy the rest of the source files into the image.
COPY . .

COPY --chown=app:app . /app

# Expose the port that the application listens on.
EXPOSE 6000

# Run the application.
CMD node bot.js
