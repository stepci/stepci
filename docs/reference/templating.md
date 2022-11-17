# Templating

When writing tests, you can take advantage of our powerful templating engine - [liquidless](https://github.com/stepci/liquidless)

**Example: Using environment variables**

```yaml{10}
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

### Available Objects

- `env` - Environment variables, defined in `env`
- `secrets` - Secret variables (such as API tokens), only configurable from the CLI
- `captures` - Captured data
- `testdata` - A row of test data (if provided)

### Available Filters

All of the liquidless [built-in filters](https://github.com/stepci/liquidless#filters) are supported

Additionally, some extra filters are included:

- [fake](https://github.com/stepci/liquidless-faker)
- [naughtystring](https://github.com/stepci/liquidless-naughtystrings)
