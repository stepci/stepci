
# Get started

## Using Node

Install the CLI

```
npm install -g stepci
```

Create example test (`tests/status.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
steps:
  - name: GET request
    url: https://{{env.host}}
    method: GET
    check:
      status: /^20/
```

Run the test

```
stepci run tests/
```

## Using Docker

Create example test (`tests/status.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
steps:
  - name: GET request
    url: https://{{env.host}}
    method: GET
    check:
      status: /^20/
```

Run the Docker image

```
docker run -v "$(pwd)"/tests:/tests ghcr.io/stepci/stepci tests/
```

## Using GitHub Action

Create example test (`tests/status.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
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
          path: "tests/"
```
