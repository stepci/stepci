# Integrating with CircleCI

[CricleCI](https://circleci.com/) is a continous integration platform that allows you test your code and automate workflows in your project. You can use StepCI in CircleCI using the official [Node Orb](https://circleci.com/developer/orbs/orb/circleci/node)

To integrate StepCI into your CircleCI build:

### Create your Step CI workflow
**workflow.yml**
```yml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://${{env.host}}
          method: GET
          check:
            status: /^20/
```
### Add Step CI to your CircleCI build using nodejs
**.circleci/config.yml**
```yml
version: 2.1
orbs:
  node: circleci/node@5.2.0

jobs:
  install-and-run:
    executor: node/default 
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: npm
      - run:
          command: npm install -D stepci # install stepci as a dev dependency
          name: install StepCI
      - run:
          command: npx stepci run workflow.yml # needs to run using npx 
          name: Run StepCI
      


workflows:
  run-step-ci: 
    jobs:
      - install-and-run
```
