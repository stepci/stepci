# Get started

## Using Node

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

## Using Docker

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

## Using GitHub Actions

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
