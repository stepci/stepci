# Templating

When writing tests, you can take advantage of our powerful templating engine - [liquidless](https://github.com/stepci/liquidless)

## Objects

**Example: Environment variables**

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

- `env` - Environment variables defined in the `env` field or in the CLI
- `secrets` - Secret variables (such as API tokens), set from the CLI
- `captures` - Captured data
- `testdata` - A row of test data (if provided)

## Filters

**Example: Uppercasing a username**

```yaml{11}
version: "1.1"
name: Posting data
tests:
  example:
    steps:
      - name: POST request
        http:
          url: https://example.com
          method: POST
          json:
            username: ${{ testdata.username | upcase }}
          check:
            status: /^20/
```

**Example: Providing positional arguments**

```yaml{11}
version: "1.1"
name: Posting data
tests:
  example:
    steps:
      - name: POST request
        http:
          url: https://example.com
          method: POST
          json:
            post: "${{ lorem.sentences | fake: 1 }}"
          check:
            status: /^20/
```

### Available Filters

All of the liquidless [built-in filters](https://github.com/stepci/liquidless#filters) are supported

Additionally, some extra filters are included:

- [fake](https://github.com/stepci/liquidless-faker)
- [naughtystring](https://github.com/stepci/liquidless-naughtystrings)
