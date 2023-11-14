# Testing Server-Sent-Events APIs

[Server-Sent-Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) is a server push technology enabling a client to receive automatic updates from a server via an HTTP connection.

You can subscribe to event-streams over SSE and listen to messages until expected pattern is matched. If no messages have matched expected patterns within the timeout, the test should fail.

::: warning
This feature is currently in preview. Some things may break or change in the future
:::

**Example: Matching Messages**

```yaml
version: "1.1"
name: Server Sent Events
tests:
  example:
    steps:
      - name: SSE
        sse:
          url: http://localhost:8080
          timeout: 10000
          check:
            messages:
              - id: 'message1'
                jsonpath:
                  $.hello: "world"
              - id: 'message2'
                body: "world"
```
