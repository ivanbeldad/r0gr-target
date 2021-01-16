# R0GR-Target

## Project structure

- target: everything related to the module target
  - models: dto, enum and interfaces used globally inside the target module
  - prioritizers: strategies used to select the next target, based on the protocols provided
    - models: interfaces definitions for prioritizers
    - strategies: everything under this folder will be concrete implementations to get the next target
    - prioritizer-definition.ts: used to define which implementation should be used with each protocol

## Usage

### Development mode (hot-reloading)

```bash
# install dependencies
npm install

# launch application listening on port 8888
PORT=8888 npm run start:dev
```

### Standard mode

```bash
# install dependencies
npm install

# launch application listening on port 8888
PORT=8888 npm start
```

### Docker Compose (single instance)

```bash
# ensure the number of replicas is 1
sed -i 's/replicas: [0-9]\+/replicas: 1/g' docker-compose.yml

# this will build the image and start the container
docker-compose up
```

### Docker Swarm (multiple instances)

```bash
# scale service to 4 replicas
sed -i 's/replicas: [0-9]\+/replicas: 4/g' docker-compose.yml

# build the image (choose one)
docker-compose build
# or
docker build ./ -t r0gr-target

# start the service
docker stack deploy -c ./docker-compose.yml r0gr
```
