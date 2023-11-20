# Retries and Timeout

You can specify a retry amount, which defines how many times to retry the step unless the result is final and a timeout, which defines how long to wait until any result is received

**Example: Retry with a interval**

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        retries:
          count: 5
          interval: 1s
        http:
          url: https://${{env.host}}
          method: GET
          check:
            status: /^20/
```

**Example: HTTP request with a timeout**

```yml
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
          timeout: 5s
          check:
            status: /^20/
```
