# Organising Workflows

## Splitting tests into multiple files

You can split your tests and steps into multiple files and import them into workflows using `$ref` syntax, similar to OpenAPI. This way you can still use defined environment variables and the state will be shared across steps.

**workflow.yml**

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  $ref: "tests.yml"
```

**tests.yml**

```yaml
example:
  steps:
    - $ref: "status.yml"
```

**status.yml**

```yaml
name: GET request
http:
  url: https://${{env.host}}
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
