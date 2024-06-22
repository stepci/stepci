# Integrating with Woodpecker CI

[Woodpecker CI](https://woodpecker-ci.org) is a simple yet powerful CI/CD engine with great extensibility.

**.woodpecker.yaml**

```yaml
steps:
  test:
    image: ghcr.io/stepci/stepci-woodpecker
    settings:
      env: MODE=prod
      secrets: API_KEY=******
      verbose: true
      load: true
      concurrency: 4
```
