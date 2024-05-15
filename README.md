# Discord Bot

# This discord bot runs in a docker container

## Ensure you have either the docker application installed or docker and docker-compose

## In your terminal invoke

```
 docker compose build
```

## To begin development run the dev environment by invoking the following

```
npm run dev
```

### Live file changes are picked up in the container utilizing docker compose up --watch

### TS Files are also live compiled during development and automatically pickedup by the containers.

### Installing new depenencies will automatically rebuild the container allowing for a long running development process

### without rebuilds or having to kill processes.
