# R0GR-Target

## Requirements

- node v14.15.4
- docker
  - Optional. It's not required to run the project and tests on a local machine.

## Project structure

- target: everything related to the module target
  - models: dto, enum and interfaces used globally inside the target module
  - prioritizers: strategies used to select the next target, based on the protocols provided
    - models: interfaces definitions for prioritizers
    - strategies: everything under this folder will be concrete implementations to get the next target
    - prioritizer-definition.ts: used to define which implementation should be used with each protocol
- health: endpoint to check the service is up and running

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

## Contributing

### Adding new protocols and implementations

In order to add new protocols there are three steps we have to take

1. Add the new protocol to the supported protocols by the service at `src/target/models/protocol.enum.ts`
2. Create the implementation to solve the problem
    - Under the folder `src/target/priotirizers/strategies` create a new class extending `PriorityDecorator`
    - Implement the required method `prioritizeStrategy` increasing or decreasing the score of each scan
      - Use the property `this.scans` to access coordinates, enemies and modify scores
      - Modify the score by +-1 (-Infinity to discard the scan entirely), and multiply by `this.weight` the result
        (this will allow to create strategies with higher priority than others)
3. Add the "Prioritizer" to `src/target/prioritizers/prioritizer-definition.ts`

#### Example using random algorithm

```typescript
// 1. Add the new protocol
// src/target/models/protocol.enum.ts
export enum Protocol {
  // ...
  RANDOM = 'random',
}
```

```typescript
// 2. Create the prioritizer implementation
// src/target/prioritizers/strategies/random-prioritizer.decorator.ts
export class RandomPrioritizerDecorator extends PriorityDecorator {
  prioritizeStrategy() {
    // We increase to score inside each scan a random value between 0 and 1 and multiplied the result by the weight
    this.scans.forEach((scan) => (scan.score += Math.random() * this.weight));
  }
}
```

```typescript
// 3. Associate the protocol with the implementation (weight optional)
// src/target/prioritizers/priotirizer-definition.ts
export class PrioritizerDefinition {
  // ...
  readonly protocolPrioritizers: ProtocolPrioritizer = {
    // ...
    [Protocol.RANDOM]: { DecoratorClass: RandomPrioritizerDecorator, weight: 0.5 },
  };
}
```

### Adding new protocols without implementation

Just follow step 1, skip 2 and add the `PassthroughPrioritizerDecorator` as the implementation in step 3.

### Adding prioritizers on all protocols

To use default implementations used in every protocol, create them normally as defined in step 2,
then in step 3 add them to `defaultPrioritizers`.

## Running the tests (e2e)

Unit tests can be executed using the `npm test` command.

First, ensure that the script has the right permissions if it doesn't already
```bash
chmod +x ./test/tests.sh
```

> Note: I had to modify the provided tests in order for them to pass.
> JSON doesn't enforce property order, and the `x` and `y` sometimes jumped around, causing the test to fail
> even when the output was correct. For example:
```json
EXPECTED: {"x":10,"y":30}
OUTPUT:   {"y":30,"x":10}
```

### Locally

First you need to have the project running using any of the methods above on localhost.

```bash
npm run test:e2e
```

### Remote

The project is deployed on private servers temporarily, so the solution can be tested even without installation.
In order to execute the tests against that environment change the endpoint to `https://r0gr.beldad.me` like so:

```bash
# using npm
npm run test:e2e https://r0gr.beldad.me

# or without npm
./test/tests.sh https://r0gr.beldad.me
```

> Keep in mind that this is running under a personal private environment.
> Altought my servers have been running 24/7 during months and the tests most certainly will work against it, **I don't guarantee them to be up all time**.
