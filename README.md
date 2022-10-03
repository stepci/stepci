![Step CI Banner](https://i.imgur.com/DiM3Gqg.png)

# Welcome

Step CI is an open-source tool, which makes testing and monitoring APIs simple

Quick overview:

- Language-agnostic. Flexible, declarative configuration language
- REST, GraphQL, XML
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
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
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
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        url: https://{{env.host}}
        method: GET
        check:
          status: /^20/
```

Run the Docker image

```
docker run -v "$(pwd)"/tests:/tests ghcr.io/stepci/stepci tests/workflow.yml
```

### Using GitHub Action

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
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

## License

Step CI is distributed under Mozilla Public License terms
