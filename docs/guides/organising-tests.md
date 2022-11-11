# Organising Tests

## Splitting tests into multiple files

You can split your tests into multiple files and include them in a workflow using `testsFrom` configuration option

::: warning
Make sure each test has a unique key, otherwise they will be merged/overwritten
:::

**workflow.yml**

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
testsFrom:
  - status.yml
```

**status.yml**

```yaml
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

## Performance tips

For the best performance, we recommend separating requests into separate tests, if these requests don't depend on the outcome of each other. This allows our runner to execute them **concurrently**, enabling greater performance for equal amount of requests

::: warning
Note that separate tests don't share context (like cookies) with each other
:::

**Example: Two status checks (as steps)**

```yaml
version: "1.1"
name: Status Check
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://example.com
          method: GET
          check:
            status: /^20/
      - name: GET request
        http:
          url: https://stepci.com
          method: GET
          check:
            status: /^20/
```

Time:

```
1.267s
```

**Example: Two status checks (as separate tests)**

```yaml
version: "1.1"
name: Status Check
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://example.com
          method: GET
          check:
            status: /^20/
  stepci:
    steps:
      - name: GET request
        http:
          url: https://stepci.com
          method: GET
          check:
            status: /^20/
```

Time

```
0.757s
```
