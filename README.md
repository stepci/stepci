![Step CI CLI Demo](https://i.imgur.com/QgC0cRr.gif)

# Welcome

Step CI is an open-source tool, which makes testing and monitoring APIs simple

Quick overview:

- Language-agnostic. Flexible, declarative configuration language
- REST, GraphQL, gRPC
- Integrated. Works seamlessly with Node, Docker and GitHub Actions

**[Try Demo on our website](https://stepci.com)**

**[Join us on GitHub Discussions](https://github.com/stepci/stepci/discussions)**

## Get started

### Using Node

Install the CLI

```
npm install -g stepci
```

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://{{env.host}}
          method: GET
          check:
            status: /^20/
```

Run the workflow

```
stepci run tests/workflow.yml
```

### Using Docker

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://{{env.host}}
          method: GET
          check:
            status: /^20/
```

Run the Docker image

```
docker run -v "$(pwd)"/tests:/tests ghcr.io/stepci/stepci tests/workflow.yml
```

### Using GitHub Actions

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://{{env.host}}
          method: GET
          check:
            status: /^20/
```

Add Step CI GitHub Action (`./github/workflows/stepci.yml`)

```yaml
on: [push]
jobs:
  api_test:
    runs-on: ubuntu-latest
    name: API Tests
    steps:
      - uses: actions/checkout@v3
      - name: Step CI Action
        uses: stepci/stepci@main
        with:
          workflow: "tests/workflow.yml"
```

## Documentation

Documentation is accessible under [`docs/`](docs/)

## Example tests

You can find a collection of Step CI example tests under [`examples/`](examples/)

## Privacy

By default, the CLI collects anonymous usage data, which includes:

- Unique user ID
- OS Name
- Node Version
- CLI Version
- Environment (Local, Docker, CI/CD)

The usage analytics can be disabled by adding `STEPCI_DISABLE_ANALYTICS` to your env variables

## License

Step CI is distributed under Mozilla Public License terms
