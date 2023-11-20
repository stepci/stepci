# Delays

The "delay" step type allows you to specify a delay step, which waits for a specified amount of time, before moving to the next step in the chain

```yml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - delay: 5s
      - name: GET request
        http:
          url: https://${{env.host}}
          method: GET
          check:
            status: /^20/
```
