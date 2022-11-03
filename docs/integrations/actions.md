# Integrating with GitHub Actions

Create example workflow

**tests/workflow.yml**

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

Run your workflow on **push** using the [official GitHub Action](https://github.com/marketplace/actions/step-ci-action)

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
